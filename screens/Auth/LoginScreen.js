import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import handleLogin from './LoginScreenService';
import styles from './LoginScreen.style';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberUser, setRememberUser] = useState(false);

  const navigation = useNavigation();

  // Cuando la pantalla se monta, comprobamos si hay un usuario recordado en el AsyncStorage
  useEffect(() => {
    async function getRememberedUser() {
      const rememberedUser = await AsyncStorage.getItem('rememberedUser');
      if (rememberedUser) {
        setEmail(rememberedUser);
        setRememberUser(true);
      }
    }
    getRememberedUser();
  }, []);

  const handlePostLogin = async () => {
    try {
      const respuesta = await handleLogin({ "username": email, "password": password });
      console.log('Respuesta:', respuesta);

      if (respuesta.token) {
        await AsyncStorage.setItem('token', respuesta.token);
        await AsyncStorage.setItem('role',  (respuesta.user.role));
        await AsyncStorage.setItem('tienda',  (respuesta.user.tienda));
      
        if (rememberUser) {
          await AsyncStorage.setItem('rememberedUser', email);
        } else {
          await AsyncStorage.removeItem('rememberedUser');
        }

        navigation.navigate('MenuScreen');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error.message);
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <ImageBackground
      source={require('./wallpaper.jpg')}
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
        <TouchableOpacity style={styles.boton} onPress={handlePostLogin}>
          <Text style={{color:"white"}}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
          <TouchableOpacity onPress={() => setRememberUser(!rememberUser)}>
            {rememberUser ? (
              <Text style={{color: 'white'}}>✓</Text> // ✓ representa el checkmark
            ) : (
              <Text style={{color: 'white'}}>◻️</Text> // ◻️ representa el cuadro vacío
            )}
          </TouchableOpacity>
          <Text style={{color: 'white', marginLeft: 5}}>Recordar usuario</Text>
          
        </View>
        <Text style={{color: 'white', fontSize:10}}>Version 0.4.0</Text>
      </View>
      
    </ImageBackground>
  );
};

LoginScreen.navigationOptions = {
  headerLeft: () => null,
};

export default LoginScreen;
