import React,{useEffect} from 'react'
import { View, FlatList, StyleSheet, Text, Image, Button, Card, ListItem } from 'react-native';
import { getProducts } from '../../Productos/ProductosScreenService';
import styles from '../../../global.css.js';


const ListaProductos = ({products, setProducts , setSortOrder, sortOrder}) => {

    
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
      console.error('Error en carga de productos:', error.message);
    }
  };
    useEffect(() => {
        fetchProducts();
    }, [])


    const handleSortPress = () => {
        // Toggle sort order when the button is pressed
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
        fetchProducts(); // Re-fetch products with the new sort order
      };

      const renderItem = ({ item }) => {
        const productImage = item.imagen ? { uri: item.imagen } : { uri: 'https://ibarramayoreo.com/detalle/images/iconos/no-encontrado.png' };
        const statusColor = item.activo ? 'green' : 'red';
    
        return (
          <View style={styles.productContainer}>
             <Card containerStyle={styles.cardContainer} >
              <Image source={productImage} style={styles.productImage} />
              <Text style={styles.productTitle}>{item.nombre}</Text>
              <Text style={styles.productDescription}>{item.descripcion}</Text>
              <Text style={{ color: statusColor }}>{item.activo ? 'Activo' : 'Inactivo'}</Text>
    
            {/*   <FlatList
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
          {/*   <Button
              title="Ver detalles"
              
              buttonStyle={styles.button}
            /> */}
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
}

export default ListaProductos