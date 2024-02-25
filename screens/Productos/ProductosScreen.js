import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProducts } from './ProductosScreenService';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './ProductosScreen.style';

const ProductScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    handleCheckToken();
    fetchProducts();
  }, []);

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

  const fetchProducts = async () => {
    try {
      let productsData = await getProducts();
      productsData = productsData.sort((a, b) => {
        const nameA = a.nombre.toUpperCase();
        const nameB = b.nombre.toUpperCase();
        return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      });
      setProducts(productsData);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const handleSortPress = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    fetchProducts();
  };

  const renderItem = ({ item }) => {
    const productImage = item.imagen ? { uri: item.imagen } : { uri: 'https://ibarramayoreo.com/detalle/images/iconos/no-encontrado.png' };
    const statusColor = item.activo ? 'green' : 'red';

    const navigateToProductDetail = (product) => {
      console.log('Product:', product);
      navigation.navigate('ProductDetail', { product, onGoBack: () => fetchProducts() });
    };
    
    return (
      <View style={styles.productContainer}>
        <Card containerStyle={styles.cardContainer}>
          <Image source={productImage} style={styles.productImage} />
          <Text style={styles.title}>{item.nombre}</Text>
          <Text style={styles.productDescription}>{item.descripcion}</Text>
          <Text style={{ color: statusColor }}>{item.activo ? 'Activo' : 'Inactivo'}</Text>
        </Card>
        <Button
          title="Ver detalles"
          onPress={() => navigateToProductDetail(item)}
          buttonStyle={styles.button}
        />
      </View>
    );
  };

  const filteredProducts = products.filter(product =>
    product.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.buttonContainer}>
        <Icon
          name={sortOrder === 'asc' ? 'sort-amount-asc' : 'sort-amount-desc'}
          size={30}
          color="black"
          onPress={handleSortPress}
          style={styles.iconButton}
        />
        <View style={styles.filterContainer}>
          <Icon
            name={showOnlyActive ? 'toggle-on' : 'toggle-off'}
            size={30}
            color={showOnlyActive ? 'green' : 'red'}
            onPress={() => setShowOnlyActive(!showOnlyActive)}
          />
          <Text style={styles.filterText}>Mostrar solo activos</Text>
        </View>
      </View>
      <TextInput
        style={styles.searchInput}
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
        placeholder="Buscar productos..."
        placeholderTextColor="gray"
      />
      <FlatList
        data={filteredProducts}
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
