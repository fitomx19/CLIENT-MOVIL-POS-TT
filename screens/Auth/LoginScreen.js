import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import handleLogin from './LoginScreenService';
import styles from './LoginScreen.style';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handlePostLogin = async () => {
    try {
      const respuesta = await handleLogin({ "username": email, "password": password });
      console.log('Respuesta:', respuesta);



      if (respuesta.token) {
        await AsyncStorage.setItem('token', respuesta.token);
        await AsyncStorage.setItem('role',  (respuesta.user.role));
        await AsyncStorage.setItem('tienda',  (respuesta.user.tienda));
      
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



export default LoginScreen;
