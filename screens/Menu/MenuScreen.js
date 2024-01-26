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
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error en el cierre de sesión:', error.message);
    }
  };

  const handleCheckToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

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
      <Text style={styles.title}>Menú</Text>
      <FlatList
        data={[
          { key: 'Crear pedido', action: () => navigation.navigate('CreateOrderScreen') },
          { key: 'Administrar Inventario', action: () => navigation.navigate('ProductScreen') },
          { key: 'Revisar pedidos', action: () => navigation.navigate('ReviewOrdersScreen') },
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
