import { StyleSheet } from 'react-native';

export const listaProductosStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
     
  },
  card: {
    marginVertical: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    alignItems: 'flex-start',
    
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Alineación al inicio para evitar desbordamiento
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  variantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  variantCell: {
    flex: 1,
    fontSize: 12,
    color: '#999999',
  },
 
  productName: {
    fontSize: 16, // Reducido de 18 a 16
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333', // Color oscuro para mejorar la legibilidad
  },
  productDescription: {
    fontSize: 14, // Reducido de 16 a 14
    marginBottom: 5,
    color: '#666666', // Color de texto secundario
  },
  variantText: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 2, // Espacio entre cada línea de texto
  },
  
});
