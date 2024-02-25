import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getVentas } from './RevisarPedidosService';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation
import moment from 'moment';
import 'moment/locale/es-mx'; // Importa el locale de español mexicano

const RevisarPedidosScreen = () => {
  const [ventas, setVentas] = useState([]);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const navigation = useNavigation(); // Obtiene la función de navegación



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
    // Invierte el orden actual y actualiza la lista de ventas
    const ventasOrdenadas = [...ventas].sort((a, b) => {
      const dateA = new Date(a.fecha);
      const dateB = new Date(b.fecha);
      return ordenAscendente ? dateA - dateB : dateB - dateA;
    });
    setVentas(ventasOrdenadas);
  };

  const navigateToDetalle = (item) => {
    // Navega a la pantalla de detalles
    
    navigation.navigate('RevisarPedidosDetalleScreen' , { detallePedido: item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Ventas</Text>
      <TouchableOpacity onPress={toggleOrden} style={styles.detalleordenButton}>
        <Text style={styles.detalleButtonText}>
          {ordenAscendente ? 'Ordenar Descendente' : 'Ordenar Ascendente'}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={ventas}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            
            <Text style={styles.date}>Fecha: {moment(item.fecha).locale('es-mx').format('LLLL')}</Text>
            <Text style={styles.date}>Hora: {moment(item.fecha).locale('es-mx').format('HH:mm:ss')}</Text>
            <Text style={styles.total}>Total: ${item.total}</Text>
            <Text style={styles.total}>Estado: {item.estado}</Text>
            <TouchableOpacity onPress={() => navigateToDetalle(item)} style={styles.detalleButton}>
            <Text style={styles.detalleButtonText}>Ver Detalle</Text>
        </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  date: {
    fontSize: 16,
    marginBottom: 4,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  pedidoItemContainer: {
    marginLeft: 16,
    marginTop: 8,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  detalleButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    marginVertical: 8,
  },

  detalleordenButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    marginVertical: 8,
  },
  detalleButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default RevisarPedidosScreen;
