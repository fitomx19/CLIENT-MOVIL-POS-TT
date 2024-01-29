import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView ,Pressable } from 'react-native';
import { updateStatusProduct ,updateProduct } from './ProductosScreenService';
 
import ProductUpdateForm from './components/ProductUpdateForm';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [isActive, setIsActive] = useState(product.activo);

  useEffect(() => {
    // No es necesario hacer nada en este efecto
  }, []);

  const handleUpdateStatus = async () => {
    try {
      // Llama a updateStatusProduct y espera su resultado antes de actualizar el estado
      const updatedStatus = await updateStatusProduct(product);

      // Actualiza el estado solo si la operación fue exitosa
      setIsActive(updatedStatus);

      // Llama al callback después de actualizar
      if (route.params.onGoBack) {
        route.params.onGoBack();
      }
      navigation.goBack(); // Regresa a la pantalla anterior
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
      // Puedes manejar el error de acuerdo a tus necesidades
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      // Llama a updateProduct y espera su resultado antes de continuar
      await updateProduct(product._id, updatedData);

      // Puedes realizar acciones adicionales después de la actualización
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      // Maneja el error según tus necesidades
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Detalles del Producto</Text>
          <Text style={styles.detailText}>Nombre: {product.nombre}</Text>
          <Text style={styles.detailText}>
            Descripción: {product.descripcion}
          </Text>
          <Text style={styles.detailText}>
            Existencias: {product.existencias}
          </Text>
          <Text style={styles.detailText}>
            Estado: {isActive ? "Activo" : "Inactivo"}
          </Text>
          <View style={styles.center}>
            <Pressable style={styles.buttongreen} onPress={handleUpdateStatus}>
              <Text style={styles.textEstado}> Actualizar Estado </Text>
            </Pressable>
          </View>
        </View>

        <ProductUpdateForm
          product={product}
          onUpdate={handleUpdate}
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  center:{
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttongreen: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
     
    width: "50%",
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'green',
    marginBottom: 16,
  },
  textEstado: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  
});

export default ProductDetailScreen;
