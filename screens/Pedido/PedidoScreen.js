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
        
      };
      
      fetchData();
    }, []);  
        

    return (
       <>
       <Total total={100}/>
       {/* <Cronometro segundos={segundos} corriendo={corriendo} setSegundos={setSegundos} setCorriendo={setCorriendo}/> */}
       {
              products.length > 0 ? (
              <ListaProductos products={products}/>
            ) : (
              <Text>Cargando ... </Text>
            )
       } 
        </>
    )
}
 


export default PedidosAddScreen