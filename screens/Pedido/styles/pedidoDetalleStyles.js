import { StyleSheet } from 'react-native';

export const pedidoDetalleStyles = StyleSheet.create({ 
  subpedidoItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subpedidoItemDetails: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  productInfo: {
    fontSize: 18,
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  variantContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
  },
  variantContent: {
    flex: 1,
  },
  variantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  variantInfo: {
    fontSize: 12,
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  subpedidoItem: {
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
  },
  añadirButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  añadirButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  // Estilos para la barra de búsqueda de productos
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 10,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    marginLeft: 5,
  },
  icon: {
    marginLeft: 5,
  },
});
