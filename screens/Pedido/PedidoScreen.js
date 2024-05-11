import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, Alert, ScrollView , Button} from 'react-native';
import Total from './components/Total';
import FinalizarPedido from './components/FinalizarPedido';
import { getProductsFiltered } from '../Productos/ProductosScreenService';
import ListaProductos from './components/ListaProductos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment-timezone';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Camera } from "expo-camera";
import styles from './styles/PedidoScreen.style';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';


const PedidosAddScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [userEscaner, setUserEscaner] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false); 
  

  const handleBarCodeScanned = ({ type, data }) => {
    setSearchQuery( data );
 
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Success',
      textBody: ` Se escaneo un código de barras tipo ${type} con el serial ${data}!` ,
    })
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

  const filteredProducts = products.filter(product => {
    const nombreLowerCase = product.nombre.toLowerCase();
    const codigoBarras = product.codigo_barras.toString(); // Convertir a string para asegurar la comparación

    // Buscar en el nombre del producto
    if (nombreLowerCase.includes(searchQuery.toLowerCase())) {
        return true; // El producto pasa el filtro si se encuentra en el nombre
    }

    // Si no se encuentra en el nombre, buscar en el código de barras
    return codigoBarras.includes(searchQuery.toLowerCase());
});
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
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
          <Pressable onPress={() => setUserEscaner(true)}>
            <Icon name="barcode" size={20} color="black" style={styles.icon} />
          </Pressable>
        </View>
      
        {userEscaner ? (
              hasPermission && (
                <>
                 <View style={styles.barCodeContainer}> 
                <Camera
                  style={[styles.camera, { aspectRatio: 4 / 3 }]} // Establece el aspectRatio de la cámara
                  ref={cameraRef}
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                />

                <Button title="Cancelar" onPress={() => setUserEscaner(false)} />
                </View>
                </>
              )
            ) : (
              
              <></>
            )}
       
        <ScrollView style={styles.scrollContainer}>
          {filteredProducts.length > 0 ? (
            <ListaProductos products={filteredProducts}  />
          ) : (
            <Text>No se encontraron productos</Text>
          )}
        </ScrollView>
      </View>
      {total > 0 && <FinalizarPedido total={total} />}
      {isCameraActive && <Camera ref={cameraRef} style={styles.camera} type={Camera.Constants.Type.front} />}
    </View>
  );
};



export default PedidosAddScreen;
