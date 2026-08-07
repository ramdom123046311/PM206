import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import TarjetasScreen from './TarjetasScreen';
import SaveAreaScreen from './SafeAreaScreen';
import PressableSwitchScreen from './PressableSwitchScreen';
import TextInputAlertScreen from './TextInputAlertScreen';
import FlatListScreen from './FlatListScreen';
import ImageBackgroundScreen from './ImageBackgroundScreen';
import ActivityIndicatorScreen from './ActivityIndicatorScreen';
import ModalScreen from './ModalScreen';

export default function MenuScreen() {

    const [screen, setScreen] = useState('menu');

    switch (screen) {

        case 'Tarjetas':
            return <TarjetasScreen />;

        case 'Safearea':
            return <SaveAreaScreen />;

        case 'Pressable':
            return <PressableSwitchScreen />;

        case 'Text':
            return <TextInputAlertScreen />;

        case 'FlatList':
            return <FlatListScreen />;

        case 'Image':
            return <ImageBackgroundScreen />;

        case 'Activity':
            return <ActivityIndicatorScreen />;

        case 'Modal':
            return <ModalScreen />;

        default:

            return (
                <View style={styles.container}>

                    <Text style={styles.titulo}>Menú de Prácticas</Text>

                    <Button title="Tarjetas" onPress={() => setScreen('Tarjetas')} />
                    <Button title="SafeArea" onPress={() => setScreen('Safearea')} />
                    <Button title="Pressable" onPress={() => setScreen('Pressable')} />
                    <Button title="TextInput" onPress={() => setScreen('Text')} />
                    <Button title="FlatList" onPress={() => setScreen('FlatList')} />
                    <Button title="ImageBackground" onPress={() => setScreen('Image')} />
                    <Button title="ActivityIndicator" onPress={() => setScreen('Activity')} />
                    <Button title="Modal" onPress={() => setScreen('Modal')} />

                </View>
            );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e11010',
        justifyContent: 'center',
        alignItems: 'center', 
        gap: 10
    },

    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff'
    }
});