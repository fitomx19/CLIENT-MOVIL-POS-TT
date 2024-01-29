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


export const updateStatusProduct = async (product) => {
  try {
    // Obtener el token JWT almacenado en AsyncStorage
    const token = await AsyncStorage.getItem('token');

    // Configurar los encabezados de la solicitud con el token JWT
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    // Realizar la solicitud con los encabezados configurados
    const response = await fetch(`${BASE_URL}/status/${product._id}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(product),
    });

    const data = await response.json();
    console.log('Product updated:', data);
    return data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}


// ...

export const updateProduct = async (productId, updatedData) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
  
      const response = await fetch(`${BASE_URL}/${productId}`, {
        method: 'POST',  
        headers: headers,
        body: JSON.stringify(updatedData),
      });
  
      const data = await response.json();
      console.log('Product updated:', data);
      return data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };
  

export const createProduct = async (product) => {

  try{
    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${BASE_URL}/`, {
      method: 'POST',  
      headers: headers,
      body: JSON.stringify(product),
    });

    const data = await response.json();
    console.log('Product creat4ed:', data);
    return data;

  }catch(error){
    console.error('Error creating product:', error);
    throw error;
  }
}