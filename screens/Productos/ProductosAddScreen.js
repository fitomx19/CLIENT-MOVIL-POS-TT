

import { View, Text, Switch, TextInput, Pressable, Alert, ScrollView, TouchableOpacity , Modal} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { createProduct } from './ProductosScreenService';
import { Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from "expo-camera";
import styles from './ProductosAddScreen.style';
import { Button } from 'react-native-elements';
import * as MediaLibrary from 'expo-media-library';

const ProductosAddScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [producto, setUpdatedProduct] = useState({
    nombre: "",
    descripcion: "",
    imagen: null,
    perecedero: false,
    codigo_barras: null,
    variantes: [],
  });

  const cameraRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false); // Estado para controlar la visibilidad de la cámara

  const [isEnabled, setIsEnabled] = useState(false);
  const [userEscaner, setUserEscaner] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back); 
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.on);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setUpdatedProduct({ ...producto, codigo_barras: data });
    alert(`Se escaneo un codigo de barras tipo ${type} con el serial ${data}!`);
    setUserEscaner(false);
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setUpdatedProduct({ ...producto, imagen: photo.uri });
        setShowCamera(false); // Cierra la pantalla de la cámara después de tomar la foto
      } catch (error) {
        console.error('Error taking photo:', error);
      }
    }
  };

  const saveImage = async () => {
    if (producto.codigo_barras) {
      try {
        await MediaLibrary.createAssetAsync(producto.codigo_barras);
        alert("Foto guardada correctamente")
        setUpdatedProduct({ ...producto, codigo_barras: null })
      } catch (error) {
        console.log(error)
      }
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setUpdatedProduct({ ...producto, imagen: result.assets[0].uri })
    }
  };

  const handleAdd = async () => {
    try {  
      const newProduct = {
        ...producto,
        imagen: producto.imagen  
      }; 
      await createProduct(newProduct); 
      Alert.alert('Producto agregado', 'La información del producto se ha agregado correctamente.', [
        { text: 'OK', onPress: () => navigation.navigate('ProductScreen') }, // Navega hacia atrás al presionar OK
      ]);

      // Limpia el formulario
      setUpdatedProduct({
        nombre: "",
        descripcion: "",
        imagen: null,
        perecedero: false,
        codigo_barras: "",
        variantes: [],
      });
    } catch (error) {
      console.error('Error creating product:', error);
      Alert.alert('Error', 'Ha ocurrido un error al agregar el producto.');
    }

  };

    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <Text style={{fontWeight:700}}>Crear Producto</Text>
          <View style={styles.container}>
            <Text style={styles.label}>Nuevo Nombre:</Text>
            <TextInput
              style={styles.input}
              value={producto.nombre}
              onChangeText={(text) =>
                setUpdatedProduct({ ...producto, nombre: text })
              }
            />

            <Text style={styles.label}>Descripción:</Text>
            <TextInput
              style={styles.input}
              value={producto.descripcion}
              onChangeText={(text) =>
                setUpdatedProduct({ ...producto, descripcion: text })
              }
            />
            <Text style={styles.label}>Imagen para el producto:</Text>
            {producto.imagen && (
            <Image
              source={{ uri: producto.imagen }}
              style={{ width: 200, height: 200 }}
            />
          )}
              
              <View style={styles.barcodeContainer}>
            <Pressable style={styles.button} onPress={() => setShowCamera(true)}>
              <Text>Tomar Foto</Text>
            </Pressable>
          </View>
             
          <Pressable style={styles.button} onPress={pickImage}>
            <Text>Seleccionar Imagen</Text>
          </Pressable>
          

            <Text style={styles.label}>Codigo de Barras:</Text>
            {userEscaner ? (
              hasPermission && (
                <Camera
                  style={[styles.camera, { aspectRatio: 4 / 3 }]} // Establece el aspectRatio de la cámara
                  ref={cameraRef}
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                />
              )
            ) : (
              <></>
            )}
            <Button title="Escanear" onPress={() => setUserEscaner(true)} />
            {producto.codigo_barras && ( <Text>Código de barras: {producto.codigo_barras}</Text>) }


            <Text style={styles.label}>Perecedero:</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                setUpdatedProduct({
                  ...producto,
                  perecedero: !producto.perecedero,
                  isEnabled: !isEnabled,
                })
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
                        variantes: prevState.variantes.map((v, i) =>
                          i === index ? { ...v, nombre: text } : v
                        ),
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
                        variantes: prevState.variantes.map((v, i) =>
                          i === index ? { ...v, precio: text } : v
                        ),
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
                        variantes: prevState.variantes.map((v, i) =>
                          i === index ? { ...v, existencias: text } : v
                        ),
                      }))
                    }
                  />
                </View>
              ))}
            </View>

            <Pressable
              style={styles.buttongreen}
              onPress={() =>
                setUpdatedProduct((prevState) => ({
                  ...prevState,
                  variantes: [
                    ...prevState.variantes,
                    { nombre: "", precio: "", existencias: "" },
                  ],
                }))
              }
            >
              <Text style={styles.text}>Agregar Variante</Text>
            </Pressable>
            <Pressable style={styles.buttonyellow} onPress={handleAdd}>
              <Text style={styles.text}>Crear Producto</Text>
            </Pressable>
          </View>


          <Modal visible={showCamera} animationType="slide">
            <View style={{ flex: 1 }}>
              <Camera
                style={{ flex: 1 }}
                type={Camera.Constants.Type.back}
                ref={cameraRef} 
              />
              <Button title="Tomar Foto" onPress={takePhoto} />
              <Button title="Cerrar" onPress={() => setShowCamera(false)} />
            </View>
          </Modal>
        </ScrollView>
      </View>
    );
    }


    


export default ProductosAddScreen
