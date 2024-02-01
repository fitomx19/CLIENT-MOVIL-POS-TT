import { ventas } from "../../enviroment";
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = ventas + 'admin/ventas';

export const getVentas = async () => {
  try {
     
    const token = await AsyncStorage.getItem('token');

   
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    
    const startDate = '2024-01-19';
    const endDate = '2024-01-31';

    const queryParams = `startDate=${startDate}&endDate=${endDate}`;
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
