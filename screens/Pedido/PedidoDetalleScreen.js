import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ListItem, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { pedidoDetalleStyles } from './styles/pedidoDetalleStyles';  
import { ALERT_TYPE,  Toast } from 'react-native-alert-notification';


const PedidoDetalleScreen = ({ route }) => {
  const { producto } = route.params;
  const [subpedido, setSubpedido] = useState([]);
  const navigation = useNavigation();

  const handleAgregarVariante = (id, nombre, precio, existencias) => {
    const existente = subpedido.find((item) => item._id === id);

    const productoOrigen = producto.nombre; // Obtener el nombre del producto origen
    const productoId = producto._id; // Obtener el identificador del producto origen

    if (existente) {
      if (existente.cantidad < existencias) {
        const nuevoSubpedido = subpedido.map((item) =>
          item._id === id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
        setSubpedido(nuevoSubpedido);
      } else {
       Toast.show({

          type: ALERT_TYPE.DANGER,
          title: 'Error',
          textBody: 'No hay existencias suficientes para este producto',
        })
      }
    } else {
      // Agregar la información adicional al objeto de la variante
      const nuevaVariante = { _id: id, nombre, cantidad: 1, precio_unitario: precio, productoOrigen, productoId };
      setSubpedido([...subpedido, nuevaVariante]);
    }
  };

  const handleEliminarVariante = (id) => {
    // Filtrar el subpedido para eliminar el artículo con el id correspondiente
    const nuevoSubpedido = subpedido.filter((item) => item._id !== id);
    setSubpedido(nuevoSubpedido);
    guardarSubpedidoEnAsyncStorage(nuevoSubpedido);
  };

  const handleAñadirPedido = async () => {
    // Validar que no haya ninguna cantidad igual a cero
    const cantidadCero = subpedido.some((item) => item.cantidad === 0);
    if (cantidadCero) {

      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'No puedes añadir productos con cantidad cero',
      })

      return;
    }

    // Guardar el subpedido en AsyncStorage
    try {
      await AsyncStorage.setItem('subpedido', JSON.stringify(subpedido));
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Success',
        textBody: 'Producto añadido al pedido.',
      })
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
        <Text style={pedidoDetalleStyles.variantInfo}>Cantidad disponible: {item.existencias}</Text>
        <Text style={pedidoDetalleStyles.variantInfo}>Código de barras: {item.codigo_barras}</Text>
        <Text style={pedidoDetalleStyles.variantInfo}>Precio: ${item.precio}</Text>
      </View>
      <View style={pedidoDetalleStyles.buttonsContainer}>
        <TouchableOpacity onPress={() => handleEliminarVariante(item._id)}>
          <Icon name="remove" type="material" color="#517fa4" size={30} />
        </TouchableOpacity>
        <Text style={pedidoDetalleStyles.quantityText}>
          {subpedido.find((subpedidoItem) => subpedidoItem._id === item._id)?.cantidad || 0}
        </Text>
        <TouchableOpacity onPress={() => handleAgregarVariante(item._id, item.nombre, item.precio, item.existencias)}>
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
    <View style={pedidoDetalleStyles.subpedidoItemContainer}>
      <View style={pedidoDetalleStyles.subpedidoItemDetails}>
        <Text>{item.productoOrigen} - {item.nombre}</Text>
        <Text>Cantidad: {item.cantidad}</Text>
        <Text>Precio Unitario: ${item.precio_unitario}</Text>
      </View>
      {/* Icono de basura para eliminar el artículo del subpedido */}
      <TouchableOpacity onPress={() => handleEliminarVariante(item._id)}>
        <Icon name="delete" size={30} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView>
      <View style={pedidoDetalleStyles.container}>
        <Text style={pedidoDetalleStyles.title}>{producto.identificador}</Text>
        <Text style={pedidoDetalleStyles.productName}>{producto.nombre}</Text>
        <Text style={pedidoDetalleStyles.productDescription}>{producto.descripcion}</Text>
        {producto.codigo_barras && (<Text style={pedidoDetalleStyles.variantInfo}>Código de barras: {producto.codigo_barras}</Text>)}
        <Text style={pedidoDetalleStyles.sectionTitle}>Variaciones:</Text>
        <FlatList
          data={producto.variantes}
          keyExtractor={(item) => item._id}
          renderItem={renderVarianteItem}
        />
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
      </View>
    </ScrollView>
  );
};

export default PedidoDetalleScreen;
