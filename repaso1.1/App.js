//Zona 1: Importaciones de componentes y archivos//
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image} from 'react-native';
import DatosScreen from './screens/DatosScreens';
//Zona 2: Main Hogar de los componentes//
export default function App() {
  return (
<View>
<DatosScreen/>
</View>
  );
}
//Zona1: Estilos y posicionamiento//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'Center',
    flexDirection:'column'
  },
});