// App.js

import React, {useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as MediaLibrary from 'expo-media-library';
import LoginScreen from './screens/Auth/LoginScreen';
import MenuScreen from './screens/Menu/MenuScreen';
import ProductScreen from './screens/Productos/ProductosScreen';
import ProductDetailScreen from './screens/Productos/ProductosDetailScreen'; 
import ProductosAddScreen from './screens/Productos/ProductosAddScreen';
import PedidosScreen from './screens/Pedido/PedidoScreen';
import PedidoDetalleScreen from './screens/Pedido/PedidoDetalleScreen';
import PagoScreen from './screens/Pago/PagoScreen';
import RevisarPedidosScreen from './screens/Pedido/RevisarPedidosScreen';
import RevisarPedidosDetalleScreen from './screens/Pedido/RevisarPedidosDetalleScreen';
import { Camera, CameraType } from 'expo-camera';

const Stack = createStackNavigator();

export default function App  ()  {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  useEffect(() => { 
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestPermissionsAsync(); 
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }
  , []);

  console.log(hasCameraPermission);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen}  options={{ 
          headerShown: false,  
        }} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="ProductosAddScreen" component={ProductosAddScreen} />
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen} 
          initialParams={{ onGoBack: () => {} }}  
        />
        <Stack.Screen name="PedidosScreen" component={PedidosScreen}  />
        <Stack.Screen name="PedidoDetalleScreen" component={PedidoDetalleScreen} />
        <Stack.Screen name="PagoScreen" component={PagoScreen} />
        <Stack.Screen name="RevisarPedidosScreen" component={RevisarPedidosScreen} />
        <Stack.Screen name="RevisarPedidosDetalleScreen" component={RevisarPedidosDetalleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

 