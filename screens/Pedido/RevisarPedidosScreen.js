import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getVentas } from './RevisarPedidosService';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/es-mx';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './RevisarPedidosScreen.style';

const RevisarPedidosScreen = () => {
  const [ventas, setVentas] = useState([]);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [numColumns, setNumColumns] = useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const data = await getVentas();
        setVentas(data);
      } catch (error) {
        console.error('Error fetching ventas:', error);
      }
    };
    fetchVentas();
  }, []);

  const toggleOrden = () => {
    setOrdenAscendente(!ordenAscendente);
    const ventasOrdenadas = [...ventas].sort((a, b) => {
      const dateA = new Date(a.fecha);
      const dateB = new Date(b.fecha);
      return ordenAscendente ? dateA - dateB : dateB - dateA;
    });
    setVentas(ventasOrdenadas);
  };

  const toggleColumns = () => {
    setNumColumns(numColumns === 1 ? 2 : 1);
  };

  const navigateToDetalle = (item) => {
    navigation.navigate('RevisarPedidosDetalleScreen', { detallePedido: item });
  };

  return (
    <View style={styles.container}>
       <Text style={styles.title}>Lista de Ventas</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={toggleOrden} style={styles.iconButton}>
          <Icon name={ordenAscendente ? 'arrow-up' : 'arrow-down'} size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleColumns} style={styles.iconButton}>
          <Icon name={numColumns === 1 ? 'list' : 'th-large'} size={20} color="#fff" />
        </TouchableOpacity>
      </View>
     
      <FlatList
        data={ventas}
        key={numColumns}
        style={styles.flatListContainer}
        numColumns={numColumns}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToDetalle(item)} style={styles.cardContainer}>
            <View style={styles.itemContainer}>
              <Text style={styles.date}>Fecha: {moment(item.fecha).locale('es-mx').format('LLLL')}</Text>
              <Text style={styles.date}>Hora: {moment(item.fecha).locale('es-mx').format('HH:mm:ss')}</Text>
              <Text style={styles.total}>Total: ${item.total}</Text>
              <Text style={styles.total}>Estado: {item.estado}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default RevisarPedidosScreen;
