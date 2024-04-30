import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
    },
    totalText: {
      fontSize: 18,
      marginBottom: 20,
      alignContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      textAlign: 'center',
    },
    orderContainer: {
      marginBottom: 20,
    },
    orderItem: {
      borderBottomWidth: 1,
      borderColor: '#ccc',
      paddingVertical: 10,
    },
    picker: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    payButton: {
      marginTop: 20,
      backgroundColor: '#4CAF50',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    guardarPedido: {
      marginTop: 20,
      backgroundColor: 'red',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    payButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    littlecamera : {
      width: 300,
      height: 300
    },
    switchContainer: {
      flexDirection: 'row', // Alineación en fila
      alignItems: 'center', // Alinear elementos verticalmente al centro
    },
    switchText: {
      flex: 1, // Que el texto ocupe el espacio restante
      marginBottom: 10,
    },
    DivcameraContainer: {
      flex: 1,
      paddingLeft: 100,
      paddingRight: 100,
      paddingTop: 20,
      paddingBottom: 50,
    },
  });
  