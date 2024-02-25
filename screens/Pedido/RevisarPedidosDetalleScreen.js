import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import moment from 'moment';
import 'moment/locale/es-mx'; // Importa el locale de español mexicano


const RevisarPedidosDetalleScreen = ({ route }) => {
  // Accede a los datos pasados como parámetros
  const detallePedido = route.params.detallePedido;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RevisarPedidosDetalleScreen</Text>

      <Text style={styles.date}>Fecha: {moment(detallePedido.fecha).locale('es-mx').format('LLLL')}</Text>
      <Text style={styles.date}>Hora: {moment(detallePedido.fecha).locale('es-mx').format('HH:mm:ss')}</Text>
      <Text>Total: ${detallePedido.total}</Text>
      <Text>Estado: {detallePedido.estado}</Text>
      {/* Imprimir comentarios si existen */}
      {detallePedido.comments && <Text>Comentarios: {detallePedido.comments}</Text>}

      {/* Imprimir si está en cocina */}
      {detallePedido.cocina && <Text>Preparado en cocina</Text>}
      <FlatList
        data={detallePedido.pedido}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.date}>Producto: {item.producto.nombre}</Text>
            <Text style={styles.total}>Cantidad: {item.cantidad}</Text>
            <Text style={styles.total}>Precio: ${item.precio}</Text>

            <Text style={styles.total}>Variante: {findVarianteName(item.producto.variantes, item.variante)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const findVarianteName = (variantes, varianteId) => {
  const variante = variantes.find((v) => v._id === varianteId);
  return variante ? variante.nombre : "Variante no encontrada";
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  date: {
    fontSize: 16,
    marginBottom: 4,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default RevisarPedidosDetalleScreen;
