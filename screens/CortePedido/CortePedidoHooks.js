import moment from 'moment-timezone';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createTicket , editTicket } from './CortePedidoScreenService'; 
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';


export const handlePayment = async (pedido,paymentMethod,comments,referencia,cocina,total,mesa,setLoading,decodedToken,navigation,resultados) => {
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
      total : total,
      mesa,
      
      respuesta_api_face: resultados
    };
    
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
      if(pedido_pago != null){ 
        delete orderData.hora_inicio; 
        delete orderData.hora_fin;
        editTicket(orderData, pedido_pago); 
        await AsyncStorage.removeItem('pedido_pago');
      }else{
        createTicket(orderData);
        await AsyncStorage.removeItem('pedido_pago');
      }
      await AsyncStorage.removeItem('hora_inicio');
      await AsyncStorage.removeItem('subpedido');
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


export const handleSave = async (pedido,paymentMethod,estado,comments,referencia,cocina,total,mesa,setLoading,decodedToken,navigation,resultados) => {
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
      total : total,
      mesa,
      
      respuesta_api_face: resultados
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
      const pedido_pago = await AsyncStorage.getItem('pedido_pago');
      if(pedido_pago != null){ 
        delete orderData.hora_inicio; 
        delete orderData.hora_fin;
        editTicket(orderData, pedido_pago); 
        await AsyncStorage.removeItem('pedido_pago');
      }else{
        createTicket(orderData);
        await AsyncStorage.removeItem('pedido_pago');
      }
      await AsyncStorage.removeItem('hora_inicio');
      await AsyncStorage.removeItem('subpedido');
      
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Exito',
        textBody: 'Pedido guardado con éxito',
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
      setLoading(false); 
    }
  };