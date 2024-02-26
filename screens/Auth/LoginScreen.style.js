import {  StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add an overlay for better readability
      width: '100%',
      padding: 20,
    },
    title: {
      fontSize: 18,
      marginBottom: 16,
      color: 'white', // Set text color to white
    },
    titlePlus:{
      fontSize: 24,
      marginBottom: 16,
      textAlign: 'center',
      color: 'white', // Set text color to white
    },
    input: {
      height: 40,
      width: '100%',
      borderColor: 'white', // Set border color to white
      borderWidth: 1,
      marginBottom: 16,
      paddingHorizontal: 10,
      color: 'white', // Set text color to white
    },
  });

export default styles;