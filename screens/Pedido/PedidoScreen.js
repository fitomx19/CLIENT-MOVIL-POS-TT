import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import Total from './components/Total';
import Pagar from './components/Pagar';
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

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        console.log('Imagen capturada:', uri);
        const imagen = await procesarImagenAsyncStorage(uri);
        console.log('Imagen guardada en AsyncStorage:', imagen);
      } catch (error) {
        console.error('Error al capturar la imagen:', error);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      takePicture();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Total total={total} setTotal={setTotal} />
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Buscar productos"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
          <Pressable onPress={() => console.log("Escanear")}>
            <Icon name="barcode" size={20} color="black" style={styles.icon} />
          </Pressable>
          <Pressable onPress={() => setIsCameraActive(true)}>
            <Icon name="camera" size={20} color="black" style={styles.icon} />
          </Pressable>
        </View>
        <ScrollView style={styles.scrollContainer}>
          {filteredProducts.length > 0 ? (
            <ListaProductos products={filteredProducts} />
          ) : (
            <Text>No se encontraron productos</Text>
          )}
        </ScrollView>
      </View>
      {total > 0 && <Pagar total={total} />}
      {isCameraActive && <Camera ref={cameraRef} style={styles.camera} type={Camera.Constants.Type.front} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginBottom: 60, // Espacio para el componente Pagar
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
    marginTop: 10,

    
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'forestgreen',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  icon: {
    marginLeft: 20,
    marginRight: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  camera: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    zIndex: -1, // Para colocar la cámara detrás del contenido
  },
});

export default PedidosAddScreen;
