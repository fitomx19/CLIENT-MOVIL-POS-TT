import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import moment from 'moment';
import 'moment/locale/es-mx';
import styles from "./RevisarPedidosDetalleScreen.style";

const RevisarPedidosDetalleScreen = ({ route }) => {
  const detallePedido = route.params.detallePedido;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{detallePedido.identificador}</Text>
        <View style={[styles.cardContainer, styles.twoColumns]}>
          <View style={styles.column}>
            <Text style={styles.title}>Fecha: </Text>
            <Text style={styles.detail}>{moment(detallePedido.fecha).locale('es-mx').format('LLLL')}</Text>
            <Text style={styles.title}>Hora: </Text>
            <Text style={styles.detail}>{moment(detallePedido.fecha).locale('es-mx').format('HH:mm:ss')}</Text>
            <Text style={styles.title}>Total: </Text>
            <Text style={styles.detail}>${detallePedido.total}</Text>
            <Text style={styles.title}>Método de pago: </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.title}>Estado: </Text>
            <Text style={styles.detail}>{detallePedido.estado}</Text>
            {detallePedido.comments && 
              <View>
                <Text style={styles.title}>Comentarios:</Text>
                <Text style={styles.detail}>{detallePedido.comments}</Text>
              </View>
            }
            <Text style={styles.detail}>{detallePedido.paymentMethod}</Text>
            {
              detallePedido.referencia &&
              <View>
                <Text style={styles.title}>Referencia: </Text>
                <Text style={styles.detail}>{detallePedido.referencia}</Text>
              </View>
            }
            {detallePedido.cocina && <Text style={styles.title}>Preparado en cocina</Text>}
          </View>
        </View>
        <View style={[styles.cardContainer, styles.productSection, {backgroundColor: '#C9F3D7'}]}>
          <FlatList
            data={detallePedido.pedido}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.column}>
                <Text style={styles.title}>Producto: </Text>
                <Text style={styles.detail}>{item.producto.nombre}</Text>
                <Text style={styles.title}>Cantidad: </Text>
                <Text style={styles.detail}>{item.cantidad}</Text>
                <Text style={styles.title}>Precio: </Text>
                <Text style={styles.detail}>${item.precio}</Text>
                <Text style={styles.title}>Variante: </Text>
                <Text style={styles.detail}>{findVarianteName(item.producto.variantes, item.variante)}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const findVarianteName = (variantes, varianteId) => {
  const variante = variantes.find((v) => v._id === varianteId);
  return variante ? variante.nombre : "Variante no encontrada";
};

export default RevisarPedidosDetalleScreen;
