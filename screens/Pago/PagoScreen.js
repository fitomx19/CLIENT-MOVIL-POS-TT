import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { createTicket } from './PagoScreenService';
import { useNavigation } from '@react-navigation/native';
import { decodeJwt } from '../../utils/jwtDecoder'; // Importa la función de decodificación del JWT
import moment from 'moment-timezone';

const PagoScreen = ({ route }) => {
  const navigation = useNavigation();

  const { total } = route.params;
  const [pedido, setPedido] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [comments, setComments] = useState('');
  const [cocina, setCocina] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null); // Estado para almacenar los datos decodificados del JWT

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
      cocina
    };
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
      createTicket(orderData);
      await AsyncStorage.removeItem('hora_inicio');
      await AsyncStorage.removeItem('subpedido');
      alert('Pedido realizado con éxito');
      navigation.navigate('MenuScreen');
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
      alert('Error al realizar el pedido');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.totalText}>Pantalla de Pago de un total de {total}</Text>
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
      <Text style={{ marginTop: 10, marginBottom: 10 }}>¿Requiere Cocina?</Text>
      <Button
        title={cocina ? 'Sí' : 'No'}
        buttonStyle={{ marginBottom: 10 }}
        onPress={() => setCocina(!cocina)}
      />
      <TouchableOpacity onPress={handlePayment} style={styles.payButton}>
        <Text style={styles.payButtonText}>Pagar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  totalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  orderContainer: {
    marginBottom: 20,
  },
  orderItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  payButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PagoScreen;
