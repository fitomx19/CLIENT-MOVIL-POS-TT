import AsyncStorage from '@react-native-async-storage/async-storage';
import { decodeJwt } from '../../utils/jwtDecoder'; 


export const enviarImagen = async (uri) => {
    try {
  
      console.log('Enviando imagen:', uri);
      let formData = new FormData();
      formData.append('imagen', {
        uri: uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });
  
      let response = await fetch('https://emotion-recognition-i33brbtavq-uc.a.run.app/cargar_imagenes', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      let data = await response.json();
      console.log('Respuesta del servidor:', data);
      return data;
     
    } catch (error) {
      console.error('Error al subir la imagen:', error);
  
    }
  };



const decodedToken = async () => {
    let token = await AsyncStorage.getItem('token');
    console.log(' 😍 Token:', token);
    const decoded = await decodeJwt(token);
    console.log(' 😍 Token decodificado:', decoded);
  };

export const procesarImagenAsyncStorage = async (imagen) => {
    //identificador usuario
    datos = await enviarImagen(imagen);
    console.log('Datos:', datos);
    return datos;
}