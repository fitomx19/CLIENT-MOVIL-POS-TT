import { usuarios } from '../../enviroment';

const handleLogin = async (data) => {
  let url = usuarios + 'login';
  console.log(url);
  let raw = JSON.stringify(data);
  console.log(raw); 

  try {
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: raw,
    });
    
    console.log('Response:', response);
    

    const responseData = await response.json();
    console.log('Success:', responseData);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const token = responseData.token;

    return token;
  } catch (error) {
    console.error('Error en la solicitud:', error.message);
    throw error;
  }
};

export default handleLogin;
