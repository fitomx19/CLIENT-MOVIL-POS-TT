import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import {createTicket} from './PagoScreenService';
import { useNavigation } from '@react-navigation/native';


const PagoScreen = ({ route }) => {
    const navigation = useNavigation();

  const { total } = route.params;
  const [pedido, setPedido] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('');  
  const [comments, setComments] = useState(''); 
  const [cocina, setCocina] = useState(false);
  const [hora_fin, setHoraFin] = useState(new Date());
   

  const obtenerPedido = async () => {
    const subpedidoGuardado = await AsyncStorage.getItem('subpedido');
    if (subpedidoGuardado) {
      const subpedido = JSON.parse(subpedidoGuardado);
      setPedido(subpedido);
    }
  };

  useEffect(() => {
    obtenerPedido();
  }, []);

  const handlePayment = async () => {
    // Lógica para procesar el pago y crear el objeto JSON
    const jsonPedido = pedido.map(item => ({
      producto: item.productoId,
      cantidad: item.cantidad,
      precio: item.precio_unitario,
      variante: item._id,
    }));

    const orderData = {
      pedido: jsonPedido,
      paymentMethod,
      comments,
        cocina
    };

    // Aquí puedes realizar acciones adicionales con orderData, como enviarlo a tu backend

    console.log('Pedido JSON:', orderData);
    try {
      // Obtener la hora de inicio de AsyncStorage
      const hora_inicio = await AsyncStorage.getItem('hora_inicio'); // Añadir await para esperar la promesa
  
      // Agregar la hora de fin al objeto orderData (no se muestra cómo se define hora_fin)
      orderData.hora_fin = new Date().toISOString(); // Supongo que hora_fin se define en otro lugar o se usa la hora actual
      // Agregar la hora de inicio al objeto orderData
      orderData.hora_inicio = hora_inicio; // No necesitas convertir a ISOString ya que ya debería ser una cadena de tiempo
  
      console.log('Pedido JSON:', orderData);
      createTicket(orderData);
      
      // Limpiar el subpedido en AsyncStorage
      await AsyncStorage.removeItem('subpedido'); // Añadir await para esperar la promesa
  
      alert('Pedido realizado con éxito');
      navigation.navigate('MenuScreen'); // Corregir la escritura de "navigation"
  } catch (error) {
      console.error('Error al realizar el pedido:', error); // Imprimir el error en la consola para facilitar la depuración
      alert('Error al realizar el pedido');
  }
  
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.totalText}>Pantalla de Pago de un total de {total}</Text>

      {/* Mostrar la orden de manera atractiva */}
      <View style={styles.orderContainer}>
        {pedido.map(item => (
          <View key={item._id} style={styles.orderItem}>
            <Text style={{fontWeight:700}}>{item.productoOrigen} - {item.nombre} </Text>
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
      <Text>¿Requiere Cocina?</Text>
        <Button
            title={cocina ? 'Sí' : 'No'}
            style={styles.button2}
            onPress={() => setCocina(!cocina)}
        />
 
      {/* Botón de Pago */}
      <TouchableOpacity onPress={handlePayment} style={styles.payButton}>
        <Text style={styles.payButtonText}>Pagar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  button2:{
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10,
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