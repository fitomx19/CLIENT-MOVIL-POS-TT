import React, { useEffect } from 'react';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, FlatList, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    alert('Corte de caja realizado con éxito');
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
      <View style={{ marginVertical: 30 }} />
      <Text style={styles.title}>Menú</Text>
      <Text style={styles.subtitle}>Restaurante los cacomixtles</Text>
      <FlatList
        data={[
          { key: 'Crear pedido', icon: 'cart-plus', action: () => navigation.navigate('PedidosScreen'), description: 'Crear un nuevo pedido' },
          { key: 'Administrar Inventario', icon: 'list-alt', action: () => navigation.navigate('ProductScreen'), description: 'Administrar el inventario de productos' },
          { key: 'Crear producto | Categoría', icon: 'plus-square', action: () => navigation.navigate('ProductosAddScreen'), description: 'Agregar un nuevo producto o categoría' },
          { key: 'Revisar pedidos', icon: 'list', action: () => navigation.navigate('RevisarPedidosScreen'), description: 'Revisar los pedidos realizados' },
          { key: 'Corte de Caja', icon: 'money', action: handleCorteCaja, description: 'Realizar un corte de caja' },
          { key: 'Cerrar sesión', icon: 'sign-out', action: handleLogout, description: 'Cerrar sesión y salir de la aplicación' },
        ]}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.buttonContainer}>
            <Button
              icon={<Icon name={item.icon} size={30} color="white" />}
              onPress={item.action}
              buttonStyle={[
                styles.button,
                {
                  backgroundColor: 'forestgreen',
                  width: 150,
                  height: 75,
                  margin: 10,
                },
              ]}
              
              titleStyle={{ fontSize: 14, textAlign: 'center' }}
            />
            <Text style={{ fontSize: 12, textAlign: 'center', color: 'gray' }}>{item.description}</Text>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

MenuScreen.navigationOptions = {
  headerLeft: () => null,
};

export default MenuScreen;
