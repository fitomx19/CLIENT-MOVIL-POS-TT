import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    cardContainer: {
        marginBottom: windowWidth * 0.015,
        borderRadius: 8,
        backgroundColor: '#fff',
        elevation: 3,
        padding: windowWidth * 0.06,
        flexDirection: 'row', // Agregamos dirección de fila para la primera card
        justifyContent: 'space-between', // Distribuye los elementos horizontalmente
    },
    twoColumns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flex: 1, // Hace que cada columna ocupe el mismo espacio
        marginRight: windowWidth * 0.02, // Añade margen entre las columnas
    },
    productSection: {
     
        padding: windowWidth * 0.06,
        marginTop: windowWidth * 0.015,
    },

    buttonSection : {
        alignItems: 'center',
        marginTop: windowWidth * 0.015,
        alignSelf: 'center',
    },
    title: {
        fontSize: windowWidth * 0.045,
        fontWeight: 'bold',
        marginBottom: windowWidth * 0.015,
        color: '#333',
    },
    titleContainer: {
        paddingTop: windowWidth * 0.015,
        paddingBottom: windowWidth * 0.015,
    },  
    detail: {
        fontSize: windowWidth * 0.042,
        color: '#666',
    },
});

export default styles;
