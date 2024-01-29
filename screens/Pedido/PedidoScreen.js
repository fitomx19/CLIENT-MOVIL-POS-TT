import React, {useState,useEffect} from 'react'
import { View, FlatList, StyleSheet, Text,Image } from 'react-native'; 
import Total from './components/Total';
import {getProducts} from '../Productos/ProductosScreenService';
import Cronometro from './components/Cronometro';
import ListaProductos from './components/ListaProductos';

const PedidosAddScreen = () => {

    const [products, setProducts] = useState([]);
    const [segundos, setSegundos] = useState(0);
    const [corriendo, setCorriendo] = useState(false);
    const [sortOrder, setSortOrder] = useState('asc'); 
        

    return (
       <>
       <Total total={100}/>
       <Cronometro segundos={segundos} corriendo={corriendo} setSegundos={setSegundos} setCorriendo={setCorriendo}/>
       <ListaProductos products={products} setProducts={setProducts} sortOrder={sortOrder} setSortOrder={setSortOrder}/>

       
        <View>
            <Text style={styles.title}>Pedidos </Text>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
       
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
        textAlign: 'center',
      },
  });


export default PedidosAddScreen