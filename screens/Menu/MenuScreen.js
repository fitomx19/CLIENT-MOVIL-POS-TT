import React, { useEffect } from 'react';
import { Button, Icon, Grid, Row } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PedidosList from './components/PedidosList';

import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';

import styles from '../../global.css.js';


const MenuScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('subpedido');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error en el cierre de sesión:', error.message);
    }
  };

  const handleCorteCaja = async () => {
    await AsyncStorage.removeItem('subpedido');
    //crear alerta con el total de ventas
    alert('Corte de caja realizado con éxito');
  }

  const handleCheckToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      //descomponer el token

      

      if (!token) {
        navigation.navigate('LoginScreen');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error.message);
    }
  };

  useEffect(() => {
    handleCheckToken();
  }, []);  

  return (
    <View style={styles.container}>
      <View style={{marginVertical:30}}/>
      <Text style={styles.title}>Menú</Text>
      <Text style={styles.subtitle}>Restaurante los cacomixtles</Text>
      <FlatList
        data={[
          { key: 'Crear pedido', action: () => navigation.navigate('PedidosScreen') },
          { key: 'Administrar Inventario', action: () => navigation.navigate('ProductScreen') },
          { key: 'Crear producto | Categoría', action: () => navigation.navigate('ProductosAddScreen') },
          { key: 'Revisar pedidos', action: () => navigation.navigate('RevisarPedidosScreen') },
          { key: 'Corte de Caja', action: handleCorteCaja },
          { key: 'Cerrar sesion', action: handleLogout },
        ]}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.buttonContainer}>
            <Button
              title={item.key}
              onPress={item.action}
              buttonStyle={[
                styles.button,
                {
                  backgroundColor: 'forestgreen', // Color verde forestal
                  width: 150,
                  height: 75,
                  margin: 10,
                },
              ]}
            />
          </View>
        )}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

MenuScreen.navigationOptions = {
  headerLeft: () => null,
};


export default MenuScreen;
