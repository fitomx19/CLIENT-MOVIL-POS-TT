

import { View, Text, Switch, TextInput, Pressable , StyleSheet, Alert, ScrollView } from 'react-native';
import React, { Component, useState } from 'react'
import {createProduct} from './ProductosScreenService'
const ProductosAddScreen = ({  navigation }) => {
    const [producto, setUpdatedProduct] = useState({
        nombre: "",
        precio: "",
        descripcion: "",
        imagen: "",
        existencias: 0,
        perecedero: false,
        codigo_barras: "",
        variantes:  [], 
      });

    const [isEnabled, setIsEnabled] = useState(false);

    
  const handleAdd = () => {
    // Aquí puedes realizar validaciones antes de enviar la actualización al servicio

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
    if (producto.existencias.toString().trim() === '') {
        Alert.alert('Error', 'Las existencias del producto es requerido.');
        return;
    }   
    createProduct(producto);
    //mostrar mensaje de actualización exitosa
    Alert.alert('Producto agregado', 'La información del producto se ha agregado correctamente.', [
      { text: 'OK', onPress: () => navigation.navigate('ProductScreen') }, // Navega hacia atrás al presionar OK

    //limpiar formulario
    setUpdatedProduct({
        nombre: "",
        precio: "",
        descripcion: "",
        imagen: "",
        existencias: 0,
        perecedero: false,
        codigo_barras: "",
        variantes:  [], 
      })

    ]);
  };
    return (
        <View style={{ flex: 1 }}>
           <ScrollView style={styles.container}>
           <Text>Crear Producto</Text>
        <View style={styles.container}>
      <Text style={styles.label}>Nuevo Nombre:</Text>
      <TextInput
        style={styles.input}
        value={producto.nombre}
        onChangeText={(text) => setUpdatedProduct({ ...producto, nombre: text })}
      />

      <Text style={styles.label}>Precio (En caso de que no tenga variantes):</Text>
      {
      producto.variantes && producto.variantes.length == 0 ? (
        <TextInput
          style={styles.input}
          value={producto || '0'}
          keyboardType="numeric"
          onChangeText={(text) => setUpdatedProduct({ ...producto, precio: text })}
        />
      ) : null
    }


      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={producto.descripcion}
        onChangeText={(text) => setUpdatedProduct({ ...producto, descripcion: text })}
      />

      <Text style={styles.label}>Imagen:</Text>
      <TextInput
        style={styles.input}
        value={producto.imagen}
        onChangeText={(text) => setUpdatedProduct({ ...producto, imagen: text })}
      />

    <Text style={styles.label}>Codigo de Barras:</Text>
      <TextInput
        style={styles.input}
    
        value={producto.codigo_barras}
        onChangeText={(text) => setUpdatedProduct({ ...producto, codigo_barras: text })}
      />
      <Text style={styles.label}>Existencia: (En caso de que no tenga variantes)</Text>
      <TextInput
        style={styles.input}
        value={producto.existencias.toString() || '0'}
        keyboardType="numeric"
        onChangeText={(text) => setUpdatedProduct({ ...producto, existencias: text })}
      />

      <Text style={styles.label}>Perecedero:</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() =>
          setUpdatedProduct({ ...producto, perecedero: !producto.perecedero, isEnabled: !isEnabled })
        }
        value={producto.perecedero}
      />

      <Text style={styles.label}>Variantes:</Text>
      <View style={styles.variantContainer}>
        {producto.variantes.map((variante, index) => (
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
      <Pressable  style = {styles.buttonyellow} onPress={handleAdd}>
        <Text style = {styles.text} >Crear Producto</Text>
      </Pressable>
    </View>
            </ScrollView>
        </View>
    )
    }


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


export default ProductosAddScreen
