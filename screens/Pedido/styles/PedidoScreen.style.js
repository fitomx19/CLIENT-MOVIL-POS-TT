import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginBottom: 60, // Espacio para el componente Pagar
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
    marginTop: 10,
  },
   barCodeContainer : {
         width: '100%',
         height: '50%',
    },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'forestgreen',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  icon: {
    marginLeft: 20,
    marginRight: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  camera: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    zIndex: -1, // Para colocar la cámara detrás del contenido
  },
  littlecamera : {
    width: 50,
    height: 50,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
     
  }
});

export default styles;