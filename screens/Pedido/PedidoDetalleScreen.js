import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { pedidoDetalleStyles } from './styles/pedidoDetalleStyles';  


const PedidoDetalleScreen = ({ route }) => {
  const { producto } = route.params;
  const [subpedido, setSubpedido] = useState([]);
  const navigation = useNavigation();

  const handleAgregarVariante = (id, nombre, precio) => {
    const existente = subpedido.find((item) => item._id === id);
  
    const productoOrigen = producto.nombre; // Obtener el nombre del producto origen
    const productoId = producto._id; // Obtener el identificador del producto origen
  
    if (existente) {
      const nuevoSubpedido = subpedido.map((item) =>
        item._id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      setSubpedido(nuevoSubpedido);
       
    } else {
      // Agregar la información adicional al objeto de la variante
      const nuevaVariante = { _id: id, nombre, cantidad: 1, precio_unitario: precio, productoOrigen, productoId };
      setSubpedido([...subpedido, nuevaVariante]);
    }
  };
  

 

const handleEliminarVariante = (id) => {
  const existente = subpedido.find((item) => item._id === id);

  if (existente && existente.cantidad > 1) {
    const nuevoSubpedido = subpedido.map((item) =>
      item._id === id ? { ...item, cantidad: item.cantidad - 1 } : item
    );
    setSubpedido(nuevoSubpedido);
    guardarSubpedidoEnAsyncStorage(nuevoSubpedido);
  } else {
    const nuevoSubpedido = subpedido.filter((item) => item._id !== id);
    setSubpedido(nuevoSubpedido);
    guardarSubpedidoEnAsyncStorage(nuevoSubpedido);
  }
};

 


  const handleAñadirPedido = async () => {
    // Guardar el subpedido en AsyncStorage
    try {
      await AsyncStorage.setItem('subpedido', JSON.stringify(subpedido));
      alert('Pedido añadido con éxito.');
      // Navegar a MenuScreen después de actualizar AsyncStorage
      navigation.navigate('PedidosScreen');
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
    }
  };
  

  const guardarSubpedidoEnAsyncStorage = async (nuevoSubpedido) => {
    try {
      await AsyncStorage.setItem('subpedido', JSON.stringify(nuevoSubpedido));
    } catch (error) {
      console.error('Error al guardar el subpedido en AsyncStorage:', error);
    }
  };

  const renderVarianteItem = ({ item }) => (
    <ListItem containerStyle={pedidoDetalleStyles.variantContainer}>
      <View style={pedidoDetalleStyles.variantContent}>
        <Text style={pedidoDetalleStyles.variantName}>{item.nombre}</Text>
        <Text style={pedidoDetalleStyles.variantInfo}>Existencias: {item.existencias}</Text>
        <Text style={pedidoDetalleStyles.variantInfo}>Precio: ${item.precio}</Text>
      </View>
      <View style={pedidoDetalleStyles.buttonsContainer}>
        <TouchableOpacity onPress={() => handleEliminarVariante(item._id)}>
          <Icon name="remove" type="material" color="#517fa4" size={30} />
        </TouchableOpacity>
        <Text style={pedidoDetalleStyles.quantityText}>
          {subpedido.find((subpedidoItem) => subpedidoItem._id === item._id)?.cantidad || 0}
        </Text>
        <TouchableOpacity onPress={() => handleAgregarVariante(item._id, item.nombre, item.precio)}>
          <Icon name="add" type="material" color="#517fa4" size={30} />
        </TouchableOpacity>
      </View>
    </ListItem>
  );

  useEffect(() => {
    // Cargar el subpedido desde AsyncStorage al montar el componente
    const cargarSubpedido = async () => {
      try {
        const subpedidoGuardado = await AsyncStorage.getItem('subpedido');
        if (subpedidoGuardado) {
          setSubpedido(JSON.parse(subpedidoGuardado));
        }
      } catch (error) {
        console.error('Error al cargar el subpedido desde AsyncStorage:', error);
      }
    };

    cargarSubpedido();
  }, []); // El segundo argumento [] asegura que se ejecute solo al montar el componente

  const renderSubpedidoItem = ({ item }) => (
    <View style={pedidoDetalleStyles.subpedidoItem} key={item._id}>
       
      <Text style={{fontWeight:700}}>{item.productoOrigen} - {item.nombre}</Text>
      <Text>Cantidad: {item.cantidad}</Text>
      <Text>Precio Unitario: ${item.precio_unitario}</Text>
    </View>
  );

  return (
    <FlatList
      style={pedidoDetalleStyles.container}
      ListHeaderComponent={
        <>
          <Text style={pedidoDetalleStyles.productName}>{producto.nombre}</Text>
          <Text style={pedidoDetalleStyles.productDescription}>{producto.descripcion}</Text>
          <Text style={pedidoDetalleStyles.productInfo}>Existencias: {producto.existencias}</Text>
          <Text style={pedidoDetalleStyles.sectionTitle}>Variaciones:</Text>
        </>
      }
      data={producto.variantes}
      keyExtractor={(item) => item._id}
      renderItem={renderVarianteItem}
      ListFooterComponent={
        <>
          <Text style={pedidoDetalleStyles.sectionTitle}>Subpedido:</Text>
          <FlatList
            data={subpedido}
            keyExtractor={(item) => item._id}
            renderItem={renderSubpedidoItem}
          />
          <TouchableOpacity
            style={pedidoDetalleStyles.añadirButton}
            onPress={handleAñadirPedido}
          >
            <Text style={pedidoDetalleStyles.añadirButtonText}>Añadir Pedido</Text>
          </TouchableOpacity>
          <View style={{ width: 10, marginBottom: 50 }} />
        </>
      }
    />
  );
};
 

 

export default PedidoDetalleScreen;
