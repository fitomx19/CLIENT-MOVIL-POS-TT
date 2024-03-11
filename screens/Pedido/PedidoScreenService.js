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
  
      let response = await fetch('https://9fe2-187-189-101-144.ngrok-free.app/cargar_imagenes', {
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
    id_usuario = decodedToken._id;
    console.log('id_usuario:', decodedToken);
    //obtener la hora de inicio de storage
    const hora_inicio = await AsyncStorage.getItem('hora_inicio');
  
    //revisar si en el storage ya existe más de 3 imagenes
    let imagenes = await AsyncStorage.getItem('imagenes');
    if (imagenes) {
      imagenes = JSON.parse(imagenes);
      if (imagenes.length >= 3) {
        return;
      }
    } else {
      imagenes = [];
    }

    //guardar la imagen en el storage
    const imagenGuardada = {
      id_usuario,
      hora_inicio,
      imagen,
    };

    imagenes.push(imagenGuardada);
    await AsyncStorage.setItem('imagenes', JSON.stringify(imagenes));

    console.log('Imagen guardada en AsyncStorage:', imagenGuardada);
}