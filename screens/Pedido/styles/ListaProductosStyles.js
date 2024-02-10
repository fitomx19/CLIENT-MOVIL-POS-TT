import { StyleSheet } from 'react-native';

export const listaProductosStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 10,
    padding: 10,
    elevation: 3,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    minWidth: 100,
    minWidth: 100,
    resizeMode: 'cover',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    marginBottom: 5,
  },
  productPrice: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  status: {
    fontSize: 16,
  },
});
