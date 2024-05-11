import React, { useState } from 'react';
import { View, Text, Switch, TextInput, Pressable , StyleSheet, Alert } from 'react-native';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

const ProductUpdateForm = ({ product, onUpdate, navigation }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    nombre: product.nombre,
    descripcion: product.descripcion,
    imagen: product.imagen,
    perecedero: product.perecedero,
    variantes: product.variantes || [], // Add the existing variants to the state
  });

  const [isEnabled, setIsEnabled] = useState(false);

  const handleUpdate = () => {
    // Aquí puedes realizar validaciones antes de enviar la actualización al servicio
    onUpdate(updatedProduct);
    //mostrar mensaje de actualización exitosa
    
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Producto actualizado',
      textBody: 'La información del producto se ha actualizado correctamente',
      button: 'OK',
      onPressButton: () => navigation.navigate('ProductScreen'),
      autoClose: 5000,
    });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nuevo Nombre:</Text>
      <TextInput
        style={styles.input}
        value={updatedProduct.nombre}
        onChangeText={(text) => setUpdatedProduct({ ...updatedProduct, nombre: text })}
      />

   


      <Text style={styles.label}>Nueva Descripción:</Text>
      <TextInput
        style={styles.input}
        value={updatedProduct.descripcion}
        onChangeText={(text) => setUpdatedProduct({ ...updatedProduct, descripcion: text })}
      />

      <Text style={styles.label}>Nueva Imagen:</Text>
      <TextInput
        style={styles.input}
        disabled={true}
        value={updatedProduct.imagen}
        onChangeText={(text) => setUpdatedProduct({ ...updatedProduct, imagen: text })}
      />

    

      <Text style={styles.label}>Perecedero:</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() =>
          setUpdatedProduct({ ...updatedProduct, perecedero: !updatedProduct.perecedero, isEnabled: !isEnabled })
        }
        value={updatedProduct.perecedero}
      />

      <Text style={styles.label}>Variantes:</Text>
      <View style={styles.variantContainer}>
        {updatedProduct.variantes.map((variante, index) => (
          <View key={index} style={styles.variantSection}>
            <Text style={styles.label}>Variante {index + 1}</Text>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.input}
              value={variante.nombre}
              onChangeText={(text) =>
                setUpdatedProduct((prevState) => ({
                  ...prevState,
                  variantes: prevState.variantes.map((v, i) => (i === index ? { ...v, nombre: text } : v)),
                }))
              }
            />
            <Text style={styles.label}>Precio:</Text>
            <TextInput
              style={styles.input}
              value={variante.precio.toString()}
              keyboardType="numeric"
              onChangeText={(text) =>
                setUpdatedProduct((prevState) => ({
                  ...prevState,
                  variantes: prevState.variantes.map((v, i) => (i === index ? { ...v, precio: text } : v)),
                }))
              }
            />
            <Text style={styles.label}>Existencias:</Text>
            <TextInput
              style={styles.input}
              value={variante.existencias.toString()}
              keyboardType="numeric"
              onChangeText={(text) =>
                setUpdatedProduct((prevState) => ({
                  ...prevState,
                  variantes: prevState.variantes.map((v, i) => (i === index ? { ...v, existencias: text } : v)),
                }))
              }
            />
          </View>
        ))}
      </View>

      <Pressable 
        style = {styles.buttongreen}
        onPress={() =>
          setUpdatedProduct((prevState) => ({
            ...prevState,
            variantes: [...prevState.variantes, { nombre: '', precio: '', existencias: '' }],
          }))
        }
      >
      <Text style = {styles.text} >Agregar Variante</Text>
      </Pressable>
      <Pressable  style = {styles.buttonyellow} onPress={handleUpdate}>
        <Text style = {styles.text} >Actualizar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  variantContainer: {
    marginBottom: 16,
  },
  variantSection: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonyellow: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'orange',
    marginBottom: 16,
    marginTop: 16,
  },
  buttongreen: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'green',
    marginBottom: 16,
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
   
});

export default ProductUpdateForm;
