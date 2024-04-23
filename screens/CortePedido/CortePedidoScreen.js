import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { createTicket , editTicket } from './CortePedidoScreenService';
import { useNavigation } from '@react-navigation/native';
import { decodeJwt } from '../../utils/jwtDecoder'; // Importa la función de decodificación del JWT
import moment from 'moment-timezone';
import {styles } from './CortePedidoScreen.style';
import { Camera } from "expo-camera";
import { enviarImagen, procesarImagenAsyncStorage } from '../Pedido/PedidoScreenService';


const CortePedidoScreen = ({ route }) => {
  const navigation = useNavigation();
  const { total } = route.params;
  const [pedido, setPedido] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('temporal');
  const [comments, setComments] = useState('');
  const [referencia, setReferencia] = useState('');
  const [estado, setEstado] = useState('preparando');
  const [cocina, setCocina] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null); // Estado para almacenar los datos decodificados del JWT
  const [loading, setLoading] = useState(false); // Estado para controlar la carga durante la transacción de pago
  const cameraRef = useRef(null);
  const [activeCamera, setActiveCamera] = useState(true);
  const [faceCoordinates, setFaceCoordinates] = useState(null);
  
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


  useEffect(() => {
    console.log('Iniciando temporizador');
    const timer = setTimeout(() => {
      takePicture();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

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
      estado: 'pagado',
      comments,
      referencia,
      cocina,
      total : total
    };

    //validar que paymentMethod no sea vacio
    if (paymentMethod ==  "") {
      alert('Selecciona un método de pago');
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
      const pedido_pago = await AsyncStorage.getItem('pedido_pago');
      console.log("🥶🥰  vamos a editar el pedido " + pedido_pago)
      if(pedido_pago != null){
        //eliminar la hora de inicio
        delete orderData.hora_inicio;
        //eliminar la hora de fin
        delete orderData.hora_fin;
        editTicket(orderData, pedido_pago);
        //eliminar el pedido_pago
        await AsyncStorage.removeItem('pedido_pago');
      }else{
        console.log("🥶 vamos a crear el pedido " + orderData)
        createTicket(orderData);
        await AsyncStorage.removeItem('pedido_pago');
      }
      await AsyncStorage.removeItem('hora_inicio');
      await AsyncStorage.removeItem('subpedido');
      alert('Pedido realizado con éxito');
      navigation.navigate('MenuScreen');
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
      alert('Error al realizar el pedido');
    } finally {
      setLoading(false); // Desbloquea el botón de pago después de completar la transacción
    }
  };
  const handleSave = async () => {
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
      estado,
      comments,
      referencia,
      cocina,
      total : total
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
      const pedido_pago = await AsyncStorage.getItem('pedido_pago');
      console.log("🥶🥰  vamos a editar el pedido " + pedido_pago)
      if(pedido_pago != null){
        //eliminar la hora de inicio
        console.log("🥶🥰  vamos a editar el pedido " + pedido_pago)
        delete orderData.hora_inicio;
        //eliminar la hora de fin
        delete orderData.hora_fin;
        editTicket(orderData, pedido_pago);
        //eliminar el pedido_pago
        await AsyncStorage.removeItem('pedido_pago');
      }else{
        console.log("🥶 vamos a crear el pedido " + orderData)
        createTicket(orderData);
        await AsyncStorage.removeItem('pedido_pago');
      }
      await AsyncStorage.removeItem('hora_inicio');
      await AsyncStorage.removeItem('subpedido');
      alert('Pedido realizado con éxito');
      navigation.navigate('MenuScreen');
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
      alert('Error al realizar el pedido');
    } finally {
      setLoading(false); // Desbloquea el botón de pago después de completar la transacción
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        console.log('Imagen capturada: 😗', uri);
        setActiveCamera(false);
        const imagen = await procesarImagenAsyncStorage(uri);
        alert('Imagen capturada, el usuario esta: ' + imagen["emocion_predominante"] + " luces " +imagen["nivel_estres"]);
      } catch (error) {
        console.error('Error al capturar la imagen:', error);
      }
    }
  };

  const handleFacesDetected = ({ faces }) => {
    if (faces.length > 0) {
      // Solo tomamos las coordenadas del primer rostro detectado
      const face = faces[0];
      setFaceCoordinates(face.bounds); // Establecer las coordenadas del rostro
    } else {
      setFaceCoordinates(null); // Si no se detecta ningún rostro, limpiar las coordenadas
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.totalText}>Corte de pedido actual ${total}.00</Text>
      <View style={{alignContent:"center" , alignItems: "center"}}>
      {
        activeCamera ? (
          <Camera
            style={styles.littlecamera}
            ref={cameraRef}
            type={Camera.Constants.Type.front}
            onFacesDetected={handleFacesDetected}
          />
          
        ) : null
      }
      {faceCoordinates && ( // Mostrar la caja solo si hay coordenadas de rostro disponibles
            <View
              style={{
                position: 'absolute',
                top: faceCoordinates.origin.y,
                left: faceCoordinates.origin.x,
                width: faceCoordinates.size.width,
                height: faceCoordinates.size.height,
                borderWidth: 2,
                borderColor: 'red',
                borderRadius: 5,
                opacity: 0.5,
              }}
            />
          )}
      </View>
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

      <TouchableOpacity onPress={handleSave} style={styles.guardarPedido} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.payButtonText}>Guardar pedido</Text>
        )}
      </TouchableOpacity>

    </ScrollView>
  );
};


export default CortePedidoScreen;
