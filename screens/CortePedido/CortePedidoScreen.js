import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { handlePayment,handleSave } from './CortePedidoHooks';
import { useNavigation } from '@react-navigation/native';
import { decodeJwt } from '../../utils/jwtDecoder'; // Importa la función de decodificación del JWT
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
  const [mesa, setMesa] = useState('');
  const [estado, setEstado] = useState('preparando');
  const [cocina, setCocina] = useState(false);
  const [decodedToken, setDecodedToken] = useState(null); // Estado para almacenar los datos decodificados del JWT
  const [loading, setLoading] = useState(false); // Estado para controlar la carga durante la transacción de pago
  const cameraRef = useRef(null);
  const [activeCamera, setActiveCamera] = useState(true);
  const [faceCoordinates, setFaceCoordinates] = useState(null);
  const [loadingCamera, setLoadingCamera] = useState(true);
  
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
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);



  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        setActiveCamera(false);
        const imagen = await procesarImagenAsyncStorage(uri);
        setLoadingCamera(false);
        alert('Imagen capturada, el usuario esta: ' + imagen["emocion_predominante"] + " luces " +imagen["nivel_estres"]);
      } catch (error) {
        alert('Error al capturar la imagen, rostro no detectado');
        console.error('Error al capturar la imagen:', error);
      }
    }
  };

  const handleFacesDetected = ({ faces }) => {
    console.log('Rostros detectados:', faces);
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
      <Text style={styles.totalText}>Corte de pedido actual: ${total}.00</Text>
      <View style={{alignContent:"center" , alignItems: "center"}}>
      {
        activeCamera ? (
          <>
          
          <View style={styles.DivcameraContainer}>
          <Camera
            style={styles.littlecamera}
            ref={cameraRef}
            type={Camera.Constants.Type.front}
            quality={0.5}
            size={{ width: 400, height: 400 }}
            //onFacesDetected={handleFacesDetected}
          />
          </View>
          </>
          
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
     <View style={styles.switchContainer}>
      <Text style={styles.switchText}>¿Requiere Cocina?</Text>
      <Switch
        value={cocina}
        onValueChange={() => setCocina(!cocina)}
        style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
      />
    </View>
    <View style={styles.mesaContainer}>
      <Text style={styles.mesaText}>Mesa</Text>
      <TextInput
        style={styles.input}
        placeholder="Mesa"
        value={mesa}
        onChangeText={text => setMesa(text)}
      />
    </View>


       
      
        <TouchableOpacity onPress={ () => handlePayment(pedido,paymentMethod,comments,referencia,cocina,total,mesa,setLoading,decodedToken,navigation)} style={styles.payButton} disabled={loading}>
        {loading   ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.payButtonText}>Pagar</Text>
        )}
      </TouchableOpacity>
         
      

     
      
        <TouchableOpacity onPress={() => handleSave(pedido,paymentMethod,estado,comments,referencia,cocina,total,mesa,setLoading,decodedToken,navigation)} style={styles.guardarPedido} disabled={loading}>
        {loading  ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={styles.payButtonText}>Guardar pedido</Text>
        )}
      </TouchableOpacity>
      

     

    </ScrollView>
  );
};


export default CortePedidoScreen;
