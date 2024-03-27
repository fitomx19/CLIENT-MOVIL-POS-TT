import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const Spinner = () => {
  return (
    <View style={styles.container}>
        <Text  >Cargando...</Text>
        <ActivityIndicator size="large" color="green" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

  text : {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,

  }
});

export default Spinner;
