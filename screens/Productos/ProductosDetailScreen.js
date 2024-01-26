// ProductDetailScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const [isActive, setIsActive] = useState(product.activo);

  useEffect(() => {
    // Lógica adicional, si es necesario al cargar la pantalla
  }, []);

  const handleUpdateStatus = () => {
    // Implementa la lógica para actualizar el estado del producto aquí
    // Puedes utilizar la misma lógica que en el servicio para actualizar el estado
    // y luego actualizar el estado local (isActive) en el componente.
    // ...

    // Ejemplo de cómo actualizar el estado local:
    setIsActive(!isActive);
  };

  return (
    <View>
      <Text>Detalles del Producto</Text>
      <Text>Nombre: {product.nombre}</Text>
      <Text>Descripción: {product.descripcion}</Text>
      <Text>Existencias: {product.existencias}</Text>
      {/* Agrega más detalles según sea necesario */}
      <Text>Estado: {isActive ? 'Activo' : 'Inactivo'}</Text>
      
      <Button title="Actualizar Estado" onPress={handleUpdateStatus} />
    </View>
  );
};

export default ProductDetailScreen;
