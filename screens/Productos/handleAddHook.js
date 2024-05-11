import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

export default function handleAddHook(producto) {
    if (producto.nombre.trim() === '') {

      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'El nombre del producto es requerido',
      })

      return;
      }
      if (producto.descripcion.trim() === '') {
        
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'La descripcion del pedido  es requerido',
      })

      return;
      }
      if (producto.imagen.trim() === '') {
          
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'La imagen del producto es requerida',
      })

          return;
      }
     if(producto.variantes.length == 0){
        
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Error',
        textBody: 'El producto debe tener al menos una variante',
      })

        return;
      }
}