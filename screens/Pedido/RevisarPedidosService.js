import moment from 'moment';
import { ventas } from "../../enviroment"; // Suponiendo que "ventas" es una variable exportada desde el archivo de entorno
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = ventas + 'admin/ventas';

export const getVentas = async () => {
  try {
    const token = await AsyncStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    // Obtener la fecha actual
    const endDate = moment().format('YYYY-MM-DD');

    // Obtener la fecha de hace un mes
    const startDate = moment().subtract(1, 'months').format('YYYY-MM-DD');

    // Obtener la tienda del AsyncStorage
    const tienda = await AsyncStorage.getItem('tienda');

    const queryParams = `startDate=${startDate}&endDate=${endDate}&tienda=${tienda}`;
    const urlWithParams = `${BASE_URL}?${queryParams}`;

    const response = await fetch(urlWithParams, {
      method: 'GET',
      headers: headers,
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching ventas:', error);
    throw error;
  }
};
