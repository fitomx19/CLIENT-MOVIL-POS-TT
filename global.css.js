import {   StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

      title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 10,
        color: 'white',
      },

      subtitle: {
        fontSize: 16,
        marginBottom: 16,
        textAlign: 'center',
        padding: 10,
        color: 'white',
      },

      subtitle2: {
        fontSize: 16,
        marginBottom: 16,
        textAlign: 'center',
        padding: 10,
        color: 'black',
      },


      button: {
        backgroundColor: 'forestgreen', // Color verde forestal
        marginHorizontal: 40,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 20,

      },

      button2: {
        backgroundColor: 'orange', // Color verde forestal
        marginHorizontal: 40,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 20,

      },

  });

export default styles;