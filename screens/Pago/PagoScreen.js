import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { createTicket , editTicket } from './PagoScreenService';
import { useNavigation } from '@react-navigation/native';
import { decodeJwt } from '../../utils/jwtDecoder'; // Importa la función de decodificación del JWT
import moment from 'moment-timezone';
import {styles } from './PagoScreen.style';
import { ALERT_TYPE, Dialog  , Toast} from 'react-native-alert-notification';


const PagoScreen = ({ route }) => {
  const navigation = useNavigation();
 
  const [pedido, setPedido] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [comments, setComments] = useState('');
  const [referencia, setReferencia] = useState('');
  const [cocina, setCocina] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null); // Estado para almacenar los datos decodificados del JWT
  const [loading, setLoading] = useState(false); // Estado para controlar la carga durante la transacción de pago

  const obtenerPedido = async () => {
    const subpedidoGuardado = await AsyncStorage.getItem('subpedido');
    if (subpedidoGuardado) {
      const subpedido = JSON.parse(subpedidoGuardado);
      setPedido(subpedido);
    }
  };

  useEffect(() => {
    obtenerPedido();
    decodeToken();
  }, []);

  const decodeToken = async () => {
    let token = await AsyncStorage.getItem('token');
    const decoded = await decodeJwt(token);
    setDecodedToken(decoded);
    console.log('Token decodificado:', decoded);
  };

  const handlePayment = async () => {
    // Bloquea el botón de pago para evitar pagos múltiples
    setLoading(true);

    const jsonPedido = pedido.map(item => ({
      producto: item.productoId,
      cantidad: item.cantidad,
      precio: item.precio_unitario,
      variante: item._id,
    }));
    const tienda = await AsyncStorage.getItem('tienda');
    const orderData = {
      id_tienda: tienda,
      pedido: jsonPedido,
      paymentMethod,
      comments,
      estado: 'pagado',
      referencia,
      cocina, 
      total : calcularTotal()
    };

    //validar que paymentMethod no sea vacio
    if (paymentMethod ==  "") {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Error',
        textBody: 'Selecciona un método de pago',
      })
      setLoading(false); // Desbloquea el botón de pago
      return;
    }

    console.log('Pedido JSON:', orderData);
    try {
      const hora_inicio = await AsyncStorage.getItem('hora_inicio');
      const horaInicioDate = moment(hora_inicio).toDate();
      orderData.id_usuario = decodedToken._id;
      orderData.hora_inicio = horaInicioDate;
      let horaFinDate = moment().tz('America/Mexico_City').format('YYYY-MM-DD HH:mm:ss')
      horaFinDate = moment(horaFinDate).toDate();
      orderData.hora_fin = horaFinDate;
      console.log('Pedido a realizar:', orderData);
      const pedido_pago = await AsyncStorage.getItem('pedido_pago');

      if(pedido_pago != null){
        //eliminar fecha de inicio
        delete orderData.hora_inicio;
        console.log('Pedido a editar:', pedido_pago);
        editTicket(orderData, pedido_pago);
      }else{
        console.log('Pedido a crear:', pedido_pago);
        createTicket(orderData);
      }

      await AsyncStorage.removeItem('hora_inicio');
      await AsyncStorage.removeItem('subpedido');
      await AsyncStorage.removeItem('pedido_pago');
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Exito',
        textBody: 'Pedido realizado con éxito',
        button: 'Cerrar',
      })
      navigation.navigate('MenuScreen');
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Error',
        textBody: 'No se pudo realizar el pedido, intente de nuevo.',
        button: 'Cerrar',
      })
    } finally {
      setLoading(false); // Desbloquea el botón de pago después de completar la transacción
    }
  };

      // Función para calcular el total del pedido
    const calcularTotal = () => {
      let total = 0;
      pedido.forEach(item => {
        total += item.precio_unitario * item.cantidad;
      });
      return total;
    };

    // Dentro del componente PagoScreen, antes del return:
    const totalPedido = calcularTotal();


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.totalText}>Pedido final total: ${totalPedido.toFixed(2)}</Text>
      <View style={styles.orderContainer}>
        {pedido.map(item => (
          <View key={item._id} style={styles.orderItem}>
            <Text style={{ fontWeight: 700 }}>{item.productoOrigen} - {item.nombre} </Text>
            <Text>Cantidad: {item.cantidad}</Text>
            <Text>Precio Unitario: ${item.precio_unitario}</Text>
          </View>
        ))}
      </View>
      <Text>Método de Pago</Text>
      <Picker
        selectedValue={paymentMethod}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setPaymentMethod(itemValue)}
      >
        <Picker.Item label="Seleccionar método de pago" value="" />
        <Picker.Item label="Efectivo" value="efectivo" />
        <Picker.Item label="Tarjeta" value="tarjeta" />
        <Picker.Item label="Transferencia" value="transferencia" />
      </Picker>
      <Text> Comentarios </Text>
      <TextInput
        style={styles.input}
        placeholder="Comentarios"
        value={comments}
        onChangeText={text => setComments(text)}
      />
     {
        paymentMethod === 'transferencia' || paymentMethod === 'tarjeta' ? (
         <> 
          <Text> Referencia </Text>
            <TextInput
              style={styles.input}
              placeholder="Referencia"
              value={referencia}
              onChangeText={text => setReferencia(text)}
            />
         </>
        ) : null
     }
      <Text style={{ marginTop: 10, marginBottom: 10 }}>¿Requiere Cocina?</Text>
      <Button
        title={cocina ? 'Sí' : 'No'}
        buttonStyle={{ marginBottom: 10 }}
        onPress={() => setCocina(!cocina)}
      />
      {/* Bloquea el botón de pago y muestra un indicador de carga si loading es true */}
      <TouchableOpacity onPress={handlePayment} style={styles.payButton} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.payButtonText}>Pagar</Text>
        )}
      </TouchableOpacity>

     

    </ScrollView>
  );
};


export default PagoScreen;
