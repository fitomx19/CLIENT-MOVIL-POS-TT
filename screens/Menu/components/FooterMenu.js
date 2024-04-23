import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';  
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    alert('Corte de caja realizado con éxito');
  };

  let data = [
    { 
      key: 'Administrar Inventario', 
      icon: 'list-alt', 
      action: () => navigation.navigate('ProductScreen'), 
      description: 'Administrar el inventario de productos' 
    },
    { 
      key: 'Crear producto | Categoría', 
      icon: 'plus-square', 
      action: () => navigation.navigate('ProductosAddScreen'), 
      description: 'Agregar un nuevo producto o categoría' 
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
