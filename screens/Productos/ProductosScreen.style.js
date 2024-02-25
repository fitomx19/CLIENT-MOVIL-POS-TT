import {   StyleSheet , Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

      title: {
        fontSize: windowWidth < 375 ? 16 : 18,
        fontWeight: 'bold',
        color: 'green',
      },

      subtitle: {
        fontSize: windowWidth < 375 ? 14 : 16,
        marginBottom: 16,
        textAlign: 'center',
         
        padding: 10,
        color: 'green',
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
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'lightgray',
      },
      filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      filterText: {
        marginLeft: 5,
      },
      iconButton: {
        marginRight: 10,
      },
      searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
      },
      productDescription: {
        fontSize: windowWidth < 375 ? 12 : 16,
        marginBottom: 10,
      },

  });

export default styles;