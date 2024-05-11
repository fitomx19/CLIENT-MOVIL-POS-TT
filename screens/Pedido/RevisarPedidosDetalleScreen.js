import React from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import moment from 'moment';
import 'moment/locale/es-mx';
import styles from "./RevisarPedidosDetalleScreen.style";
import { Button } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const RevisarPedidosDetalleScreen = ({ route }) => {
  const navigation = useNavigation();
  const detallePedido = route.params.detallePedido;
  //console.log("detallePedido 🥶 ", detallePedido);

  const handleEditarPedido = async ( pay = false) => {
    try {
      // Obtener el subpedido previo de AsyncStorage
      let previo = await AsyncStorage.getItem('subpedido');
      console.log('Subpedido previo: ', previo);
      
      // Obtener el nuevo subpedido
      let nuevo = detallePedido.pedido;
  
      // Formatear el nuevo subpedido para que coincida con la estructura del subpedido previo
      nuevo = nuevo.map(item => {
        let producto = item.producto;
        let varianteId = item.variante;
        
        // Buscar la variante correspondiente al producto en el nuevo subpedido
        let variante = null;
        producto.variantes.forEach(v => {
          if (v._id === varianteId) {
            variante = v;
          }
        });
  
        if (variante) {
          return {
            _id: variante._id, // El _id es el id de la variante en el nuevo subpedido
            nombre: variante.nombre, // El nombre es el nombre de la variante en el nuevo subpedido
            cantidad: item.cantidad, // La cantidad es la cantidad del nuevo subpedido
            precio_unitario: variante.precio, // El precio_unitario es el precio de la variante en el nuevo subpedido
            productoOrigen: producto.nombre, // El productoOrigen es el nombre del producto en el nuevo subpedido
            productoId: producto._id // El productoId es el id del producto en el nuevo subpedido
          };
        } else {
          // Manejar el caso donde no se encuentra la variante
          return {
            _id: "ID predeterminado",
            nombre: "Nombre predeterminado",
            cantidad: 0,
            precio_unitario: 0,
            productoOrigen: "Producto predeterminado",
            productoId: "ID predeterminado"
          };
        }
      });
  
      // Guardar el nuevo subpedido formateado en AsyncStorage
      await AsyncStorage.setItem('subpedido', JSON.stringify(nuevo));
      console.log('Subpedido nuevo formateado: ', nuevo);
    } catch (error) {
      console.error('Error al editar el pedido: ', error);
    }

     //reenviar a la pantalla de pedidos
     
    await AsyncStorage.setItem('pedido_pago', JSON.stringify(detallePedido._id));
    if(pay){
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Pedido',
        textBody: `Pagaremos el pedido : + detallePedido.identificador`,
        autoClose: 5000,
      })
      navigation.navigate('PagoScreen');
    }else{
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Pedido',
        textBody: `Continuaremos con el pedido : + detallePedido.identificador`,
        autoClose: 5000,
      })



      navigation.navigate('PedidosScreen');
    }
    
  };
  
  //reedirigir a la pantalla de pagar
  const handlePagarPedido = async () => {
    handleEditarPedido(true);   
  };


  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{detallePedido.identificador}</Text>
        <View style={[styles.cardContainer, styles.productSection]}>
         {
          detallePedido.estado === 'pagado' ? <Text style={styles.title}>Pedido pagado</Text> :  <Button title="Continuar pedido" onPress={() => handleEditarPedido()} />
         }
          {
              detallePedido.estado === 'pagado' ? null :  <Button title="Pagar pedido" onPress={() => handlePagarPedido()} />
            }
         
        </View>
        <View style={[styles.cardContainer, styles.twoColumns]}>
          <View style={styles.column}>
            <Text style={styles.title}>Fecha: </Text>
            <Text style={styles.detail}>{moment(detallePedido.fecha).locale('es-mx').format('LLLL')}</Text>
            
            <Text style={styles.title}>Total: </Text>
            <Text style={styles.detail}>${detallePedido.total}</Text>
            <Text style={styles.title}>Método de pago: </Text>
            <Text style={styles.detail}>{detallePedido.paymentMethod}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.title}>Hora: </Text>
            <Text style={styles.detail}>{moment(detallePedido.fecha).locale('es-mx').format('HH:mm:ss')}</Text>
            
            
            {detallePedido.comments && 
              <View>
                <Text style={styles.title}>Comentarios:</Text>
                <Text style={styles.detail}>{detallePedido.comments}</Text>
              </View>
            }
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
      
        <View style={[styles.cardContainer, styles.buttonSection]}>
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
