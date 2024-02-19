import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, Image, TextInput } from 'react-native';
import Total from './components/Total';
import { getProducts } from '../Productos/ProductosScreenService'; 
import ListaProductos from './components/ListaProductos';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import moment from 'moment-timezone';

const PedidosAddScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]); 
  const [total, setTotal] = useState(0); 
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <>
      <Total total={total} setTotal={setTotal}/>
      <TextInput
        style={styles.input}
        placeholder="Buscar productos"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
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
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default PedidosAddScreen;
