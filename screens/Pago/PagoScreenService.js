import { pedidos } from "../../enviroment";
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = pedidos + 'ticket';
const BASE_URL_MOD = pedidos + 'ticketInfo';

export const createTicket = async (product) => {

  
  try{
    console.log('Ticket a crear:', product);  

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


 

export const editTicket = async (product, identificador) => {

  try{
    console.log('ID Ticket a modificar:', identificador); 
    //convertir a string el identificador
    identificador = identificador.toString();
    identificador = identificador.replace(/"/g, ''); // Esto eliminará todas las comillas dobles del identificador
    console.log('Informacioin a incluir o modificar:', product);  

    const token = await AsyncStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    let url = `${BASE_URL_MOD}/${identificador}`

    console.log('URL:', url);

    const response = await fetch(url, {
      method: 'POST',  
      headers: headers,
      body: JSON.stringify(product),
    });

    const data = await response.json();
    console.log('Ticket edited:', data);
    return data;

  }catch(error){
    console.error('Error editing Ticket:', error);
    throw error;
  }
}