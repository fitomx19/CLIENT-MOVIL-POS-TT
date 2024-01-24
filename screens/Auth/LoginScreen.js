import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from '@react-navigation/native';  // Importa useNavigation aquí
import handleLogin from './LoginScreenService';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();  // Mueve useNavigation aquí

  const handlePostLogin = async () => {
    // Verifica la conexión a Internet antes de realizar la solicitud
    const netInfo = await NetInfo.fetch();
    
    if (!netInfo.isConnected) {
      Alert.alert('Sin conexión', 'Por favor, conecta tu dispositivo a Internet.');
      return;
    }

    try {
      const token = await handleLogin({ "username": email, "password": password });
      
      if (token) {
        await AsyncStorage.setItem('token', token);
        navigation.navigate('MenuScreen');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error.message);
      // Manejar el error según sea necesario
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Iniciar Sesión" onPress={handlePostLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
