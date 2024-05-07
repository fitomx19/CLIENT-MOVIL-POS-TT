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
import CortePedidoScreen from './screens/CortePedido/CortePedidoScreen';
import RevisarPedidoHistoricoScreen from './screens/PedidoHistorico/RevisarPedidoHistoricoScreen';

const Stack = createStackNavigator();

export default function App  ()  {
  
 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="MenuScreen" component={MenuScreen}  options={{ 
          headerShown: false,  
        }} />
        <Stack.Screen name="ProductScreen" component={ProductScreen} options={{headerTitle: "Lista de productos"}} />
        <Stack.Screen name="ProductosAddScreen" component={ProductosAddScreen} options={{headerTitle: "Agregar Producto"}} />
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen} 
          options={{headerTitle: "Detalle de producto"}}
          initialParams={{ onGoBack: () => {} }}  
        />
        <Stack.Screen name="PedidosScreen" component={PedidosScreen} options={{headerTitle:"Crear pedido"}}  />
        <Stack.Screen name="PedidoDetalleScreen" component={PedidoDetalleScreen} options={{headerTitle: "Detalles de pedido"}} />
        <Stack.Screen name="PagoScreen" component={PagoScreen} options={{headerTitle: ""}} />
        <Stack.Screen name="RevisarPedidosScreen" component={RevisarPedidosScreen}  options={{headerTitle: "Revisar pedidos"}} />
        <Stack.Screen name="RevisarPedidosDetalleScreen" component={RevisarPedidosDetalleScreen} options={{headerTitle: "Detalles de pedidos"}}  />
        <Stack.Screen name="CortePedidoScreen" component={CortePedidoScreen} options={{headerTitle: "Corte de pedidos"}}  />
        <Stack.Screen name="RevisarPedidoHistoricoScreen" component={RevisarPedidoHistoricoScreen} options={{headerTitle: "Historial Pedidos"}}  />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

 