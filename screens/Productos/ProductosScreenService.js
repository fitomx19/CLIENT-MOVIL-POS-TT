import { productos } from "../../enviroment";
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = productos + 'product';

export const getProducts = async () => {
  try {
    // Obtener el token JWT almacenado en AsyncStorage
    const token = await AsyncStorage.getItem('token');

    // Configurar los encabezados de la solicitud con el token JWT
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    // Realizar la solicitud con los encabezados configurados
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: headers,
    });

    const data = await response.json();
    console.log('Products:', data);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
