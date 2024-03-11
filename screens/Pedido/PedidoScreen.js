import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, Alert } from 'react-native';
import Total from './components/Total';
import { getProductsFiltered } from '../Productos/ProductosScreenService';
import ListaProductos from './components/ListaProductos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment-timezone';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Camera } from "expo-camera";
import { enviarImagen, procesarImagenAsyncStorage } from './PedidoScreenService';

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
    return unsubscribe;
  }, [navigation]);

  const filteredProducts = products.filter(product => product.nombre.toLowerCase().includes(searchQuery.toLowerCase()));

  /*const takePictureAnalyseSentimen = async () => {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        console.log('Imagen capturada:', uri);
        // Enviar la imagen al servidor Flask
        const resultado = await enviarImagen(uri); 
        Alert.alert(
          'Análisis de imagen',
          `Nivel de estres: ${resultado.emocion_predominante}\nCoeficiente de confianza: ${resultado.promedio_coeficientes}\nEmocion predominante: ${resultado.emocion_predominante}`,
          [{ text: 'OK', onPress: () => setIsCameraActive(false) }],
          { cancelable: false, style: 'large' } // Agregamos style: 'large' para aumentar el tamaño del contenedor de alerta
        );
        setIsCameraActive(false);
      } catch (error) {
        console.error('Error al capturar la imagen:', error);
      }
    }
  };*/

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        console.log('Imagen capturada:', uri);
        // Enviar la imagen al servidor Flask
        const imagen = await procesarImagenAsyncStorage(uri);
        console.log('Imagen guardada en AsyncStorage:', imagen);
        //mostrar el local storage de imagenes
        const imagenes = await AsyncStorage.getItem('imagenes');
    } catch (error) {
      console.error('Error al capturar la imagen:', error);
    }
  }
};
  

  //esperar 3 segundos para que la camara se active
  useEffect(() => {
     
      const timer = setTimeout(() => {
        takePicture();
      }, 3000);
      return () => clearTimeout(timer);
    
  }, []);

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
      
      
          <Camera ref={cameraRef} style={styles.camera} type={Camera.Constants.Type.front} />
           
         
     
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
    height:1
  }
});

export default PedidosAddScreen;
