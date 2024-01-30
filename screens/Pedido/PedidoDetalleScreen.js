// DetallesProducto.js

import React from 'react';
import { View, Text } from 'react-native';

const PedidoDetalleScreen = ({ route }) => {
  const { producto } = route.params;
  console.log('producto', producto);
  return (
    <View>
        <Text>{producto.nombre}</Text>
        <Text>{producto.descripcion}</Text>
        <Text>{producto.precio}</Text>
        <Text>{producto.existencias}</Text>

    </View>
  );
};

export default PedidoDetalleScreen;
