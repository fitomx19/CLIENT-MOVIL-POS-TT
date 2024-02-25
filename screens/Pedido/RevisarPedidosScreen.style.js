import { StyleSheet , Dimensions } from 'react-native';

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
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconButton: {
    backgroundColor: 'orange',
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
  },
  detalleButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    marginVertical: 8,
  },
  detalleButtonText: {
    color: '#fff',
    textAlign: 'center',
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
