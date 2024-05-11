import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';  
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';


const FooterMenu = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('subpedido');
      await AsyncStorage.removeItem('role');
      await AsyncStorage.removeItem('tienda');
      //eliminar pedido_pago
      await AsyncStorage.removeItem('pedido_pago');

      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error en el cierre de sesión:', error.message);
    }
  };
  
  const handleCorteCaja = async () => {
    await AsyncStorage.removeItem('subpedido');
    Toast.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Corte de caja',
      textBody: 'Corte de caja realizado con éxito',
      autoClose: 5000,
    });
  };

  let data = [
    { 
      key: 'Hitorial de Pedidos', 
      icon: 'history', 
      action: () => navigation.navigate('RevisarPedidoHistoricoScreen'), 
      description: 'Revisar Historial de Pedidos' 
    },
    { 
      key: 'Productos', 
      icon: 'archive', 
      action: () => navigation.navigate('ProductScreen'), 
      description: 'Administrar el inventario de productos' 
    },
    { 
      key: 'Crear producto', 
      icon: 'plus-square', 
      action: () => navigation.navigate('ProductosAddScreen'), 
      description: 'Agregar un nuevo producto' 
    },
    
    { 
      key: 'Corte de Caja', 
      icon: 'money', 
      action: handleCorteCaja, 
      description: 'Realizar un corte de caja' 
    },
    { 
      key: 'Cerrar sesión', 
      icon: 'sign-out', 
      action: handleLogout, 
      description: 'Cerrar sesión y salir de la aplicación' 
    }
  ];

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#fff', paddingVertical: 10 }}>
      {data.map(item => (
        <TouchableOpacity key={item.key} onPress={item.action} style={{ alignItems: 'center' }}>
          <Icon name={item.icon} size={30} color="#000" />
          
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FooterMenu;
