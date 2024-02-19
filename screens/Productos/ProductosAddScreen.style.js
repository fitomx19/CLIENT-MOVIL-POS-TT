import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#fff',
    }, 
    barcodeContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        },
    
    flipButton: {
      flex: 0.1,
      alignSelf: 'flex-end',
      alignItems: 'center',
      backgroundColor: 'transparent',
      padding: 10,
    },
    flipButtonText: {
      fontSize: 18,
      marginBottom: 10,
      color: 'white',
    },
    cameraContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'orange',
      marginBottom: 16,
      marginTop: 16,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      padding: 8,
    },
    variantContainer: {
      marginBottom: 16,
    },
    variantSection: {
      marginBottom: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    buttonyellow: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'orange',
      marginBottom: 16,
      marginTop: 16,
    },
    buttongreen: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'green',
      marginBottom: 16,
      marginTop: 16,
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
     
  });

    export default styles;