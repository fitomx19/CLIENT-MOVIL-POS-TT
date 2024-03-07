import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, Text, Image, TextInput, Pressable, Button, Alert } from 'react-native';
import Total from './components/Total';
import { getProductsFiltered, enviarImagen } from '../Productos/ProductosScreenService';
import ListaProductos from './components/ListaProductos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment-timezone';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Camera } from "expo-camera";

const PedidosAddScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [userEscaner, setUserEscaner] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const cameraRef = useRef(null);

  const handleBarCodeScanned = ({ type, data }) => {
    setUpdatedProduct({ ...producto, codigo_barras: data });
    alert(`Se escaneo un código de barras tipo ${type} con el serial ${data}!`);
    setUserEscaner(false);
  };

  const fetchProducts = async () => {
    try {
      let productsData = await getProductsFiltered();

      setProducts(productsData);
    } catch (error) {
      console.error('Error en carga de productos:', error.message);
    }
  };

  useEffect(() => {
    const takeAndSendPicture = async () => {
      if (cameraRef.current) {
        try {
          const { uri } = await cameraRef.current.takePictureAsync();
          console.log('Imagen capturada:', uri);
          // Enviar la imagen al servidor Flask
          const resultado = await enviarImagen(uri); 
          Alert.alert(`Nivel de estres: ${resultado.emocion_predominante} , Coefiente de confianza: ${resultado.promedio_coeficientes} , Emocion predominante: ${resultado.emocion_predominante}`);
          setIsCameraActive(false);
        } catch (error) {
          console.error('Error al capturar la imagen:', error);
        }
      }
    };
  
    // Llamar a la función para tomar y enviar la foto al cargar la pantalla
    takeAndSendPicture();
  }, []);

  
  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
      const horaInicioDate = moment().tz('America/Mexico_City').format('YYYY-MM-DD HH:mm:ss')
      await AsyncStorage.setItem('hora_inicio', horaInicioDate);
      const hora_inicio = await AsyncStorage.getItem('hora_inicio');
      console.log('Hora de inicio guardada:', hora_inicio);

    };
    fetchData();
  }, []);

  useEffect(() => {




    const cargarDesdeAsyncStorage = async () => {
      try {
        const subpedidoGuardado = await AsyncStorage.getItem('subpedido');
        if (subpedidoGuardado) {
          const subpedidoActualizado = JSON.parse(subpedidoGuardado);
          const nuevoTotal = subpedidoActualizado.reduce((acc, item) => acc + item.cantidad * item.precio_unitario, 0);
          setTotal(nuevoTotal);
        }
      } catch (error) {
        console.error('Error al cargar desde AsyncStorage:', error);
      }
    };
    const unsubscribe = navigation.addListener('focus', () => {
      cargarDesdeAsyncStorage();
    });

     //usar takePictureAsync para tomar la foto
     takePicture() 
    return unsubscribe;

   

  }, [navigation]);

  const filteredProducts = products.filter(product => product.nombre.toLowerCase().includes(searchQuery.toLowerCase()));

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        console.log('Imagen capturada:', uri);
        // Enviar la imagen al servidor Flask
        const resultado = await enviarImagen(uri); 
        Alert.alert(`Nivel de estres: ${resultado.emocion_predominante} , Coefiente de confianza: ${resultado.promedio_coeficientes} , Emocion predominante: ${resultado.emocion_predominante}`);
        setIsCameraActive(false);
      } catch (error) {
        console.error('Error al capturar la imagen:', error);
      }
    }
  };

  return (
    <>
      <Total total={total} setTotal={setTotal} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 20, marginLeft: 10 }}
          placeholder="Buscar productos"
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
        <Pressable onPress={() => console.log("Escanear")}>
          <Icon name="barcode" size={20} color="black" style={{ marginLeft: 20, marginRight: 20 }} />
        </Pressable>
        <Pressable onPress={() => setIsCameraActive(true)}>
          <Icon name="camera" size={20} color="black" style={{ marginLeft: 20, marginRight: 20 }} />
        </Pressable>
      </View>
      {isCameraActive && (
        <View style={styles.cameraContainer}>
          <Camera ref={cameraRef} style={styles.camera} type={Camera.Constants.Type.front} />
          <Button title="Tomar foto" onPress={takePicture} />
          <Button title="Cerrar cámara" onPress={() => setIsCameraActive(false)} />
        </View>
      )}
      {filteredProducts.length > 0 ? (
        <ListaProductos products={filteredProducts} />
      ) : (
        <Text>No se encontraron productos</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  }
});

export default PedidosAddScreen;
