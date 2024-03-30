import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Pagar = ({ total }) => {
  const navigation = useNavigation();

  const navigateToPay = async () => {
    navigation.navigate('PagoScreen', { total: total });
  };

  const handlePagar = () => {
    navigateToPay();
  };

  return (
    <TouchableOpacity style={styles.payButton} onPress={handlePagar}>
      <Text style={styles.payButtonText}>Pagar</Text>
    </TouchableOpacity>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  payButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'forestgreen',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth, // Ajustar el ancho del botón al ancho de la pantalla
    height: screenWidth * 0.1, // Ajustar la altura del botón al 10% del ancho de la pantalla
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Pagar;
