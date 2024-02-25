import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text,Image } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProducts } from './ProductosScreenService';
import styles from '../../global.css.js';
import { Card, ListItem ,Button} from 'react-native-elements';

const ProductScreen = ({ navigation }) => {

  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');  

  const navigateToProductDetail = (product) => {
    console.log('Product:', product);
    navigation.navigate('ProductDetail', { product, onGoBack: () => fetchProducts()  });
  };

 

  const handleCheckToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        navigation.navigate('LoginScreen');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error.message);
    }
  };

  useEffect(() => {
    handleCheckToken();
  }, []);


  const fetchProducts = async () => {
    try {
      let productsData = await getProducts();

      // Sort products based on the current sort order
      productsData = productsData.sort((a, b) => {
        const nameA = a.nombre.toUpperCase();
        const nameB = b.nombre.toUpperCase();

        if (sortOrder === 'asc') {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      });

      setProducts(productsData);
    } catch (error) {
      // Handle error
    }
  };

  const handleSortPress = () => {
    // Toggle sort order when the button is pressed
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    fetchProducts(); // Re-fetch products with the new sort order
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderItem = ({ item }) => {
    const productImage = item.imagen ? { uri: item.imagen } : { uri: 'https://ibarramayoreo.com/detalle/images/iconos/no-encontrado.png' };
    const statusColor = item.activo ? 'green' : 'red';

    return (
      <View style={styles.productContainer}>
         <Card containerStyle={styles.cardContainer} >
          <Image source={productImage} style={styles.productImage} />
          <Text style={{fontWeight:700}}>{item.nombre}</Text>
          <Text style={styles.productDescription}>{item.descripcion}</Text>
          <Text style={{ color: statusColor }}>{item.activo ? 'Activo' : 'Inactivo'}</Text>

          {/* <FlatList
            data={item.variantes}
            keyExtractor={(variante) => variante._id}
            renderItem={({ item: variante }) => (
              <ListItem>
                <Text style={styles.variantName}>{variante.nombre}</Text>
                <Text style={styles.variantInfo}>Existencias: {variante.existencias}</Text>
                <Text style={styles.variantInfo}>Precio: ${variante.precio}</Text>
              </ListItem>
            )}
          /> */}
        </Card>
        <Button
          title="Ver detalles"
          onPress={() => navigateToProductDetail(item)}
          buttonStyle={styles.button}
        />
      </View>
    );
  };


  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Productos en inventario</Text>
 
      <Button
        title={`Ordenar los productos ${sortOrder === 'asc' ? 'Descendente' : 'Ascendente'}`}
        onPress={handleSortPress}
        buttonStyle={styles.button2}
      />

      <FlatList
        data={products}
        keyExtractor={(product) => product._id}
        renderItem={renderItem}
      />
    </View>
  );
};

ProductScreen.navigationOptions = {
  headerLeft: () => null,
};

export default ProductScreen;
