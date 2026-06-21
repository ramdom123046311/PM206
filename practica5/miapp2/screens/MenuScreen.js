//Zona 1: Importaciones de componentes y archivos//
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Button} from 'react-native';
import React,{useState} from 'react';
import TarjetasScreen from './TarjetasScreen';
import SaveAreaScreen from './SafeAreaScreen';
import PressableSwitchScreen from './PressableSwitchScreen';
import TextInputAlertScreen from './TextInputAlertScreen';
import FlatListScreen from './FlatListScreen';
import ImageBackgroundScreen from './ImageBackgroundScreen';
//Zona 2: Main Hogar de los componentes//
export default function MenuScreen() {
    const[screen,setScreen] = useState('menu');
        switch(screen){
            case 'Tarjetas':
            return <TarjetasScreen/>
            case 'Safearea':
             return <SaveAreaScreen/>
             case 'Pressable':
             return <PressableSwitchScreen/>
             case 'Text':
             return <TextInputAlertScreen/>
              case 'FlatList':
             return <FlatListScreen/>
               case 'Image':
             return <ImageBackgroundScreen/>
            case 'menu':
                default:
                     return (
    <View style={styles.container}>
<Text>Menu de Practicas</Text>
<Button onPress={()=>setScreen('Tarjetas')}title='tarjetas'></Button>
<Button onPress={()=>setScreen('Safearea')}title='SafeArea'></Button>
<Button onPress={()=>setScreen('Pressable')}title='Pressable'></Button>
<Button onPress={()=>setScreen('Text')}title='Textinput'></Button>
<Button onPress={()=>setScreen('FlatList')}title='FlatList'></Button>
<Button onPress={()=>setScreen('Image')}title='ImageBack'></Button>
    </View>
  );

        }
  return (
    <View style={styles.container}>

    </View>
  );

}
//Zona1: Estilos y posicionamiento//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e11010',
    alignItems: 'center',
    justifyContent: 'Center',
    flexDirection:'column'
  },
});
