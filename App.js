// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/Auth/LoginScreen';
import MenuScreen from './screens/Menu/MenuScreen';
import ProductScreen from './screens/Productos/ProductosScreen';
import ProductDetailScreen from './screens/Productos/ProductosDetailScreen'; 
import ProductosAddScreen from './screens/Productos/ProductosAddScreen';
import PedidosScreen from './screens/Pedido/PedidoScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="ProductosAddScreen" component={ProductosAddScreen} />
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen} 
          initialParams={{ onGoBack: () => {} }}  
        />
        <Stack.Screen name="PedidosScreen" component={PedidosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
