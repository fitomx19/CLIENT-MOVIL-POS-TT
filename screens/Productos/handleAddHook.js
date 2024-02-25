import { Alert } from 'react-native';

export default function handleAddHook(producto) {
    if (producto.nombre.trim() === '') {
        Alert.alert('Error', 'El nombre del producto es requerido.');
        return;
      }
      if (producto.descripcion.trim() === '') {
        Alert.alert('Error', 'La descripcion del producto es requerido.');
        return;
      }
      if (producto.imagen.trim() === '') {
          Alert.alert('Error', 'La imagen del producto es requerido.');
          return;
      }
     if(producto.variantes.length == 0){
        Alert.alert('Error', 'El producto debe tener al menos una variante.');
        return;
      }
}