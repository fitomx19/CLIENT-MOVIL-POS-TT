import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Total = ({ total }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.totalText}>Total:</Text>
      <Text style={styles.amountText}>${total.toFixed(2)}</Text>
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
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amountText: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default Total;
