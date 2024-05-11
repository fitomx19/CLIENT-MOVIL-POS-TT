import moment from 'moment';
import { ventas } from "../../enviroment"; // Suponiendo que "ventas" es una variable exportada desde el archivo de entorno
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = ventas + 'admin/ventas';

export const getVentas = async (fecha = 1) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    
    // Obtener la fecha de hace un dia
    const startDate = moment().subtract(8, 'days').format('YYYY-MM-DD');

    // Obtener la fecha actual mas un dia
    const endDate = moment().format('YYYY-MM-DD');

    console.log('startDate:', startDate);
    console.log('endDate:', endDate);

    // Obtener la tienda del AsyncStorage
    const tienda = await AsyncStorage.getItem('tienda');
    const queryParams = `startDate=${startDate}&endDate=${endDate}&tienda=${tienda}`;
    const urlWithParams = `${BASE_URL}?${queryParams}`;

    const response = await fetch(urlWithParams, {
      method: 'GET',
      headers: headers,
    });

    let data = await response.json();

    // Ordenar las ventas por fecha de forma descendente
    data = data.sort((a, b) => moment(b.fecha).valueOf() - moment(a.fecha).valueOf());

    return data;
  } catch (error) {
    console.error('Error fetching ventas:', error);
    throw error;
  }
};
