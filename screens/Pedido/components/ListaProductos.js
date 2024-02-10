import React, {useState,useEffect} from 'react';
import { View, FlatList, Text, Image, StyleSheet,TouchableOpacity  } from 'react-native';
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
    //console.log('URL de la imagen:', item.imagen);

    const productImage = item.imagen
      ? { uri: "https://storage.googleapis.com/productos_pos_plus/1707449165831-51c1e53115a38b9ada4330dfbe5c7890.jpg" }
      : { uri: 'https://ibarramayoreo.com/detalle/images/iconos/no-encontrado.png' };

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
              <Text style={listaProductosStyles.productPrice}>Existencias: {item.existencias}</Text>
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
