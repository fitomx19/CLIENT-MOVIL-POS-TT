import React, { useState } from 'react';
import { View, Text, Switch, TextInput, Button, StyleSheet, Alert } from 'react-native';

const ProductUpdateForm = ({ product, onUpdate, navigation }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    nombre: product.nombre,
    precio: product.precio,
    descripcion: product.descripcion,
    imagen: product.imagen,
    existencias: product.existencias,
    perecedero: product.perecedero,
    variantes: product.variantes || [], // Add the existing variants to the state
  });

  const [isEnabled, setIsEnabled] = useState(false);

  const handleUpdate = () => {
    // Aquí puedes realizar validaciones antes de enviar la actualización al servicio
    onUpdate(updatedProduct);
    //mostrar mensaje de actualización exitosa
    Alert.alert('Producto actualizado', 'La información del producto se ha actualizado correctamente.', [
      { text: 'OK', onPress: () => navigation.navigate('ProductScreen') }, // Navega hacia atrás al presionar OK
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nuevo Nombre:</Text>
      <TextInput
        style={styles.input}
        value={updatedProduct.nombre}
        onChangeText={(text) => setUpdatedProduct({ ...updatedProduct, nombre: text })}
      />

      <Text style={styles.label}>Nuevo Precio:</Text>
      <TextInput
        style={styles.input}
        value={updatedProduct.precio.toString() || '0'}
        keyboardType="numeric"
        onChangeText={(text) => setUpdatedProduct({ ...updatedProduct, precio: text })}
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

      <Text style={styles.label}>Existencia:</Text>
      <TextInput
        style={styles.input}
        value={updatedProduct.existencias.toString() || '0'}
        keyboardType="numeric"
        disabled={true}
        onChangeText={(text) => setUpdatedProduct({ ...updatedProduct, existencias: text })}
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

      {/* Add a section for handling variants */}
      <Text style={styles.label}>Variantes:</Text>
      {updatedProduct.variantes.map((variante, index) => (
        <View key={index}>
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
      {/* Add a button to add a new variant */}
      <Button
        title="Agregar Variante"
        onPress={() =>
          setUpdatedProduct((prevState) => ({
            ...prevState,
            variantes: [...prevState.variantes, { nombre: '', precio: '', existencias: '' }],
          }))
        }
      />
      <Button title="Actualizar" onPress={handleUpdate} />
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
});

export default ProductUpdateForm;
