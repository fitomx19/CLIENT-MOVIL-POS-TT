// jwtDecoder.js

import JWT from 'expo-jwt';
 


const secretKey =  process.env.EXPO_PUBLIC_JWTPASSWORD;

export const decodeJwt = async (token) => {
  try {
    console.log('Token a decodificar:', token);
    console.log('Clave secreta:', secretKey);
    
    let code = JWT.decode(token, secretKey);
    return code;
     
  } catch (error) {
    console.error('Error al verificar o decodificar el token:', error);
  }
};
