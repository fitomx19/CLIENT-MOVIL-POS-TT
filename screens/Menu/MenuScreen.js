import React from 'react'

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

const MenuScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.title}>Menú</Text>
        </View>
        <View style={styles.content}>
            <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
            >
            <Ionicons name="home-outline" size={24} color="black" />
            <Text style={styles.buttonText}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Profile')}
            >
            <Ionicons name="person-outline" size={24} color="black" />
            <Text style={styles.buttonText}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Settings')}
            >
            <Ionicons name="settings-outline" size={24} color="black" />
            <Text style={styles.buttonText}>Ajustes</Text>
            </TouchableOpacity>
        </View>
        </View>
    )
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    header: {
        height: 80,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 18,
    },
})

export default MenuScreen  