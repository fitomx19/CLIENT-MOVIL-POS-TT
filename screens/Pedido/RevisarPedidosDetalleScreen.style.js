import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#f8f8f8',
    },
    cardContainer: {
      marginBottom: windowWidth * 0.015, // Reducimos el espacio entre las tarjetas
      borderRadius: 8,
      backgroundColor: '#fff',
      elevation: 3,
      padding: windowWidth * 0.02, // Reducimos el padding de la tarjeta principal
    },
    title: {
      fontSize: windowWidth * 0.045,
      fontWeight: 'bold',
      marginBottom: windowWidth * 0.015, // Reducimos el espacio entre los títulos y los detalles
      color: '#333',
    },
    detail: {
      fontSize: windowWidth * 0.042,
      color: '#666',
    },
  });

export default styles;