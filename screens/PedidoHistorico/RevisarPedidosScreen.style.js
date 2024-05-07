// RevisarPedidosScreen.styles.js

import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  title2: {
    fontSize: windowWidth < 375 ? 16 : 14,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: 'forestgreen',
    padding: 10,
    position: 'sticky', // Hacer el contenedor pegajoso
    top: 0, // Fijar el contenedor en la parte superior
    zIndex: 1, // Asegurar que esté por encima del contenido
  },
  iconButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  itemContainer: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    margin: 4,
    shadowColor: '#000',
    shadowRadius: 4,
    backgroundColor: '#f9f9f9',
    flex: 1, // Ajusta el FlatList para abarcar todo el ancho disponible
  },
  date: {
    fontSize: windowWidth < 375 ? 10 : 16,
    marginBottom: 4,
  },
  total: {
    fontSize: windowWidth < 375 ? 10 : 16,
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 14,
  },
  estado_texto: {
    fontSize: windowWidth < 375 ? 10 : 16,
    marginTop: 8,
    fontSize: 14,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f0f0f0',
    marginVertical: 4,
    borderRadius: 8,
  },
});

export default styles;
