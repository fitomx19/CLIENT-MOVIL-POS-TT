import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';  
import { listaProductosStyles } from '../styles/ListaProductosStyles';  

const ListaProductos = ({ products }) => {
  const [sortedProducts, setSortedProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const sorted = [...products].sort((a, b) => a.nombre.localeCompare(b.nombre));
    setSortedProducts(sorted);
  }, [products]);

  const renderProduct = ({ item }) => {  

    const navigateToDetails = () => {
      navigation.navigate('PedidoDetalleScreen', { producto: item });
    };
    
    return (
      <TouchableOpacity onPress={navigateToDetails}>
        <Card style={listaProductosStyles.card}>
          <View style={listaProductosStyles.contentContainer}>
            <Image style={listaProductosStyles.image} source={{ uri: item.imagen }} />
            <View style={listaProductosStyles.textContainer}>
              <Text style={listaProductosStyles.productName}>{item.nombre}</Text>
              <Text style={listaProductosStyles.productDescription}>{item.descripcion}</Text>
            
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={listaProductosStyles.container}
      data={sortedProducts}
      keyExtractor={(item) => item._id}
      renderItem={renderProduct}
      ListEmptyComponent={<Text>Cargando ... </Text>}
    />
  );
};

export default ListaProductos;
