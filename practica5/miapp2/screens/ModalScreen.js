import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Modal,
    Pressable,
} from 'react-native';

export default function ModalScreen() {

    const [modalVisible, setModalVisible] = useState(false);

    return (

        <View style={styles.container}>

            <Text style={styles.titulo}>
                Modal Informativo
            </Text>

            <Button
                title="Abrir Modal"
                onPress={() => setModalVisible(true)}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >

                <View style={styles.fondo}>

                    <View style={styles.bottomSheet}>

                        <Text style={styles.texto}>
                             Información
                        </Text>

                        <Text style={styles.descripcion}>
                            Este es un ejemplo de un Modal tipo Bottom Sheet.
                            Se desliza desde la parte inferior y puede utilizarse
                            para mostrar información, formularios o confirmaciones.
                        </Text>

                        <Pressable
                            style={styles.boton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.textoBoton}>
                                Cerrar
                            </Text>
                        </Pressable>

                    </View>

                </View>

            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    fondo: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.45)',
    },

    bottomSheet: {
        backgroundColor: '#FFFFFF',
        padding: 25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        alignItems: 'center',
    },

    texto: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },

    descripcion: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#444',
    },

    boton: {
        backgroundColor: '#2196F3',
        paddingVertical: 12,
        paddingHorizontal: 35,
        borderRadius: 10,
    },

    textoBoton: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

});