import { productos } from "../../enviroment";
import AsyncStorage from '@react-native-async-storage/async-storage';
 

const BASE_URL = productos + 'product';

export const getProducts = async () => {
  try {
    // Obtener el token JWT almacenado en AsyncStorage
    const token = await AsyncStorage.getItem('token');
    const tienda = await AsyncStorage.getItem('tienda');


    // Configurar los encabezados de la solicitud con el token JWT
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    // Realizar la solicitud con los encabezados configurados
    const response = await fetch(BASE_URL+'/tienda/' + tienda, {
      method: 'GET',
      headers: headers,
    });

    const data = await response.json();
 
    return data;
  } catch (error) {
    //si hay un error de TokenExpiredError se redirige a la pantalla de login
    

    console.error('Error fetching products:', error);
    throw error;
  }
};


export const getProductsFiltered = async () => {
  try {
    // Obtener el token JWT almacenado en AsyncStorage
    const token = await AsyncStorage.getItem('token');
    const tienda = await AsyncStorage.getItem('tienda');

    // Configurar los encabezados de la solicitud con el token JWT
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    // Realizar la solicitud con los encabezados configurados
    const response = await fetch(BASE_URL+'/tienda/' + tienda, {
      method: 'GET',
      headers: headers,
    });

    const data = await response.json();

    // Filtrar los productos que estan inactivos
    const activeProducts = data.filter((product) => product.activo);
 
    return activeProducts;
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
    try {
        console.log("producto -> 😹", product);
        const token = await AsyncStorage.getItem('token');

        const formData = new FormData();

        let tienda = await AsyncStorage.getItem('tienda');

        // Agregar cada parámetro al FormData
        formData.append('nombre', product.nombre);
        formData.append('descripcion', product.descripcion);
        formData.append('perecedero', product.perecedero.toString()); // Convertir a cadena
        formData.append('codigo_barras', product.codigo_barras);
        formData.append('tienda_id', tienda);
        const uriParts = product.imagen.split('/');
        const imageName = uriParts[uriParts.length - 1];
        formData.append('imagen', {
            uri: product.imagen,
            name: imageName,
            type: 'image/jpeg',
        });

        // Agregar las variantes
        product.variantes.forEach((variante, index) => {
            formData.append(`variantes[${index}][nombre]`, variante.nombre);
            formData.append(`variantes[${index}][existencias]`, variante.existencias.toString());
            formData.append(`variantes[${index}][precio]`, variante.precio.toString());
        });

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const response = await fetch(`${BASE_URL}/add`, {
            method: 'POST',
            headers: headers,
            body: formData, // Usar formData en lugar de un objeto JSON
        });

        const data = await response.json();
        console.log('Product created:', data);
        return data;

    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};


 