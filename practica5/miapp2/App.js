//Zona 1: Importaciones de componentes y archivos//
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image} from 'react-native';
import {Saludo} from './components/Saludo';
import {Saludo2} from './components/Saludo2';
import {Perfil} from './components/Perfil';
//Zona 2: Main Hogar de los componentes//
export default function App() {
  return (
    <View style={styles.container}>

      <Perfil style={styles.tarjetaRoja} nombre= "Manuel"carrera = "sistemas" materia= "P movil" cuatrimestre ="9no"></Perfil>
      <Text>-------------------------------------------------------------------------------------------------------------</Text>
      <Perfil style={styles.TarjetaVerde} nombre= "Daniel"carrera = "mecatronica" materia= "embebidos" cuatrimestre ="8vo"></Perfil>
      <StatusBar style="auto" />

<Perfil style={styles.tarjetaRoja} nombre= "Jack"carrera = "sistemas" materia= "P movil" cuatrimestre ="6to"></Perfil>
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
    flexDirection:'center'
  },

  tarjetaRoja:{backgroundColor:'#FF6B6B'},
  TarjetaVerde:{backgroundColor:'#1fc427'},
  
});
