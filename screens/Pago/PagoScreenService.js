import { pedidos } from "../../enviroment";
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = pedidos + 'ticket';


export const createTicket = async (product) => {

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
    console.log('Ticket created:', data);
    return data;

  }catch(error){
    console.error('Error creating Ticket:', error);
    throw error;
  }
}