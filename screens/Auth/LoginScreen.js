import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from '@react-navigation/native';
import handleLogin from './LoginScreenService';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handlePostLogin = async () => {
    try {
      const token = await handleLogin({ "username": email, "password": password });

      if (token) {
        await AsyncStorage.setItem('token', token);
        navigation.navigate('MenuScreen');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error.message);
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <ImageBackground
    source={{ uri: 'https://legacy.reactjs.org/logo-og.png' }}
    style={styles.container}
    resizeMode="cover"
    >
      <View style={styles.overlay}>
        
        <Text style={styles.titlePlus}>POS SYSTEM ++ </Text>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={{color:"white"}}>Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={{color:"white"}}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button title="Iniciar Sesión" onPress={handlePostLogin} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add an overlay for better readability
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 16,
    color: 'white', // Set text color to white
  },
  titlePlus:{
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: 'white', // Set text color to white
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'white', // Set border color to white
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    color: 'white', // Set text color to white
  },
});

export default LoginScreen;
