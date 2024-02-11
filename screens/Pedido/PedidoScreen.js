import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Image } from 'react-native';
import Total from './components/Total';
import { getProducts } from '../Productos/ProductosScreenService'; 
import ListaProductos from './components/ListaProductos';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import moment from 'moment-timezone';


const PedidosAddScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]); 
  const [total, setTotal] = useState(0); 

  const fetchProducts = async () => {
    try {
      let productsData = await getProducts();
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
      //leer la hora de inicio de AsyncStorage
      const hora_inicio = await AsyncStorage.getItem('hora_inicio');
      console.log('Hora de inicio guardada:', hora_inicio);
    };

    

    fetchData();
  }, []); // Se ejecutará solo cuando se monte el componente

  useEffect(() => {
    const cargarDesdeAsyncStorage = async () => {
      try {
        const subpedidoGuardado = await AsyncStorage.getItem('subpedido');
        if (subpedidoGuardado) {
          const subpedidoActualizado = JSON.parse(subpedidoGuardado);
          
          //calcular el total actualizado
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
  }, [navigation]); // Se ejecutará cada vez que se enfoque el componente

  return (
    <>
      <Total  total={total} setTotal={setTotal}/>
      {/* <Cronometro segundos={segundos} corriendo={corriendo} setSegundos={setSegundos} setCorriendo={setCorriendo}/> */}
      {products.length > 0 ? (
        <ListaProductos products={products} />
      ) : (
        <Text>Cargando ... </Text>
      )}
    </>
  );
};

export default PedidosAddScreen;
