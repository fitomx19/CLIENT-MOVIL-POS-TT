import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import 'moment/locale/es-mx';
import Spinner from '../../globalComponents/Spinner';
import { getVentas } from './RevisarPedidosService';
import styles from './RevisarPedidosScreen.style'; // Importamos los estilos
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';


const RevisarPedidoHistoricoScreen = () => {
  const [ventas, setVentas] = useState([]);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [numColumns, setNumColumns] = useState(1);
  const [startDate, setStartDate] = useState(moment().subtract(1, 'months').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD')); 
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const [Asc,setAsc] = useState(true);

  // Función para obtener las ventas
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
  }, [startDate, endDate]);

   
  // Función para cambiar el orden de las ventas
  const toggleOrden = () => {
    setOrdenAscendente(!ordenAscendente);
    const ventasOrdenadas = [...ventas].sort((a, b) => {
      return ordenAscendente ? b.fecha.localeCompare(a.fecha) : a.fecha.localeCompare(b.fecha);
    });
    setVentas(ventasOrdenadas);
    setAsc(!Asc);
  };

  // Función para cambiar el número de columnas
  const toggleColumns = () => {
    setNumColumns(numColumns === 1 ? 2 : 1);
  };

  // Función para navegar al detalle de un pedido
  const navigateToDetalle = (item) => {
    navigation.navigate('RevisarPedidosDetalleScreen', { detallePedido: item });
  };

  // Función para agrupar los pedidos por fecha
  const groupByDate = (ventas) => {
    return ventas.reduce((result, venta) => {
      const fecha = moment(venta.fecha).format('YYYY-MM-DD');
      if (!result[fecha]) {
        result[fecha] = [];
      }
      result[fecha].push(venta);
      return result;
    }, {});
  };

  // Agrupar los pedidos por fecha
  const ventasAgrupadas = groupByDate(ventas);

  return (
    <ScrollView>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={toggleOrden} style={styles.iconButton}>
          {
            Asc ? <Icon name={'sort-asc'} size={20} color="forestgreen" /> : <Icon name={'sort-desc'} size={20} color="forestgreen" />
          }
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleColumns} style={styles.iconButton}>
          <Icon name={numColumns === 1 ? 'list' : 'th-large'} size={20} color="forestgreen" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {
          ventas.length === 0 && <Spinner />
        }
        {Object.entries(ventasAgrupadas).map(([fecha, ventasPorFecha]) => (
          <View key={fecha}>
            <Text style={styles.title}>{moment(fecha).locale('es-mx').format('dddd LL')}</Text>
            <FlatList
              ref={flatListRef}
              data={ventasPorFecha}
              key={numColumns}
              style={styles.flatListContainer}
              numColumns={numColumns}
              ListEmptyComponent={<Spinner />}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigateToDetalle(item)} style={styles.cardContainer}>
                  <View style={styles.itemContainer}>
                    <Text style={styles.title2}>{item._id.substring(0, 18) + "-" + item._id.substring(18)}</Text>
                    <Text style={styles.date}><Icon name={'clock-o'} size={20} color="forestgreen" /> {moment(item.fecha).locale('es-mx').format('HH:mm:ss')}</Text>
                    <Text style={styles.date}><MaterialIcons name={'table-restaurant'} size={20} color="forestgreen" /> {item.mesa ? item.mesa : 'Sin mesa'}</Text>
                    <Text style={styles.date}><Icon name={'hourglass-1'} size={20} color="forestgreen" /> {item.estado}</Text>
                  </View>
                </TouchableOpacity>
              )}
              
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default RevisarPedidoHistoricoScreen;
