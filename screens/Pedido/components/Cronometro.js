import React, {useEffect} from 'react'
import { View, FlatList, StyleSheet, Text,Image, Button } from 'react-native';


const Cronometro = ( { segundos , setCorriendo , corriendo , setSegundos}) => {

    useEffect(() => {
        corriendo = true;
        let interval;
        console.log('corriendo', corriendo);
        if (corriendo) {
          interval = setInterval(() => {
            setSegundos((prevSegundos) => prevSegundos + 1);
          }, 1000);
        } else {
          clearInterval(interval);
        }
    
        return () => clearInterval(interval);
      }, [corriendo]);
    
      const handleIniciarDetener = () => {
        setCorriendo((prevCorriendo) => !prevCorriendo);
      };
    
      const handleReiniciar = () => {
        setSegundos(0);
        setCorriendo(false);
      };

      return (
        <View style={styles.container}>
          <Text style={styles.texto}>{segundos}s</Text>
           
        </View>
      );
    };
    
const styles = StyleSheet.create({
         
        texto: {
          fontSize: 36,
          marginBottom: 20,
        },
        botones: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '80%',
        },
      });
      
      export default Cronometro;
