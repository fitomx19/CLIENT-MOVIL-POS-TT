import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 


const Total = ({total,setTotal}) => {
  const navigation = useNavigation();

  const navigateToPay = async () => {
      navigation.navigate('PagoScreen' , { total : total} );
    };

  useEffect(() => {
    // Calcular el total al cargar el componente
    calcularTotal();
  }, []);

  const calcularTotal = async () => {
    try {
      // Obtener el subpedido desde AsyncStorage
      const subpedidoGuardado = await AsyncStorage.getItem('subpedido');

      if (subpedidoGuardado) {
        const subpedido = JSON.parse(subpedidoGuardado);

        // Calcular el total sumando el precio de cada producto multiplicado por la cantidad
        const nuevoTotal = subpedido.reduce((acc, item) => acc + item.cantidad * item.precio_unitario, 0);

        setTotal(nuevoTotal);
      }
    } catch (error) {
      console.error('Error al calcular el total:', error);
    }
  };

  const handlePagar = () => {
    navigateToPay();
  };

  const handleLimpiarLocalStorage = async () => {
    try {
      // Limpiar el subpedido en AsyncStorage
      await AsyncStorage.removeItem('subpedido');
      setTotal(0);
      alert('LocalStorage limpiado con éxito');
    } catch (error) {
      console.error('Error al limpiar el LocalStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.totalContainer}>
        <Icon name="shopping-cart" type="font-awesome" color="green" size={30} />
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.amountText}>${total}</Text>
      </View>
      {total > 0 && (
        <TouchableOpacity style={styles.payButton} onPress={handlePagar}>
          <Text style={styles.payButtonText}>Pagar</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.trashButton} onPress={handleLimpiarLocalStorage}>
        <Icon name="trash" type="font-awesome" color="white" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  amountText: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  payButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  payButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  trashButton: {
    backgroundColor: 'red',
    padding: 10,
    marginRight: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default Total;
