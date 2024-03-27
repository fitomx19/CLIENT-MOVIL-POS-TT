import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ImageBackground, FlatList, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import FooterMenu from './components/FooterMenu'; // Import the FooterMenu component
import styles from '../../global.css.js';
import { decodeJwt } from '../../utils/jwtDecoder'; 

const MenuScreen = ({ navigation }) => {

  const [user, setUser] = useState(''); // Add this line

  const handleCheckToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.navigate('LoginScreen');
      }
       
      //deencriptar token
      const tokenDecoded =  await decodeJwt(token);
       
      setUser(tokenDecoded.username);
       
    } catch (error) {
      console.error('Error en el inicio de sesión:', error.message);
    }
  };

  useEffect(() => {
    handleCheckToken();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={{marginBottom:50}}>
        <ImageBackground
          source={require('./components/restaurante_wallpaper.png')}
          style={{ height: 300, width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center' ,  }}
        >
          <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 20 }}>
             
            <Text style={styles.title}>Restaurante Los cacomixtles</Text>
          </View>
        </ImageBackground>
      </View>
      {
        user ? <Text style={styles.subtitle2}>Usuario actual : {user}</Text> : <Text style={styles.subtitle2}>Bienvenido usuario</Text>
      }
      <FlatList
        data={[
          { key: 'Crear pedido', icon: 'cart-plus', action: () => navigation.navigate('PedidosScreen'), description: 'Crear un nuevo pedido' },
          { 
            key: 'Revisar pedidos', 
            icon: 'list', 
            action: () => navigation.navigate('RevisarPedidosScreen'), 
            description: 'Revisar los pedidos' 
          }
        ]}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.buttonContainer}>
            <Button
              icon={<Icon name={item.icon} size={65} color="white" />}
              onPress={item.action}
              buttonStyle={[
                styles.button,
                {
                  backgroundColor: 'forestgreen',
                  width: 100,
                  height: 100,
                  margin: 10,
                },
              ]}
              titleStyle={{ fontSize: 14, textAlign: 'center' }}
            />
            <Text style={{ fontSize: 14, textAlign: 'center', color: 'gray' }}>{item.description}</Text>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
      
      <FooterMenu navigation={navigation} />
    </View>
  );
};

MenuScreen.navigationOptions = {
  headerLeft: () => null,
};

export default MenuScreen;
