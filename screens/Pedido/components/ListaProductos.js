import React, {useState,useEffect} from 'react';
import { View, FlatList, Text, Image, StyleSheet,TouchableOpacity  } from 'react-native';
import { Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

const ListaProductos = ({ products }) => {
const [sortedProducts, setSortedProducts] = useState([]);
const navigation = useNavigation(); // Inicializa la navegación

    useEffect(() => {
        // Ordenar los productos alfabéticamente por nombre
        const sorted = [...products].sort((a, b) => a.nombre.localeCompare(b.nombre));
        setSortedProducts(sorted);
    }, [products]);


  const renderProduct = ({ item }) => {
    const productImage = item.imagen
      ? { uri: item.imagen }
      : { uri: 'https://ibarramayoreo.com/detalle/images/iconos/no-encontrado.png' };

    const navigateToDetails = () => {
      // Navegar a la pantalla de detalles con el producto como parámetro
      navigation.navigate('PedidoDetalleScreen', { producto: item });
    };

    return (
      <TouchableOpacity onPress={navigateToDetails}>
      <Card style={styles.card}>
        <View style={styles.contentContainer}>
          <Image style={styles.image} source={productImage} />
          <View style={styles.textContainer}>
            <Text style={styles.productName}>{item.nombre}</Text>
            <Text style={styles.productDescription}>{item.descripcion}</Text>
            <Text style={styles.productPrice}>Precio: ${item.precio}.00</Text>
            <Text style={styles.productPrice}>Existencias: {item.existencias}</Text>
          </View>
        </View>
      </Card>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      style={styles.container}
      data={sortedProducts}
      keyExtractor={(item) => item._id}
      renderItem={renderProduct}
      ListEmptyComponent={<Text>Cargando ... </Text>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 10,
    padding: 10,
    elevation: 3,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    marginBottom: 5,
  },
  productPrice: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
  },
});

export default ListaProductos;
