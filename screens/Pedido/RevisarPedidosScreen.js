import React,{useEffect,useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native'
import {getVentas} from './RevisarPedidosService'

const RevisarPedidosScreen = () => {

const [ventas, setVentas] = useState([])


useEffect(() => {
    const fetchVentas = async () => {
        try {
            const data = await getVentas();
            console.log('Ventas:', data);
            setVentas(data);
        } catch (error) {
            console.error('Error fetching ventas:', error);
        }
    };
    fetchVentas();
} ,[]);
    

return(
    <View>
        <Text>Gato de color negro</Text>
    </View>
)

}


export default RevisarPedidosScreen;

