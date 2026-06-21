//Zona 1: Importaciones de componentes y archivos//
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Perfil} from '../components/Perfil';
//Zona 2: Main Hogar de los componentes//
export default function TarjetasScreen() {
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
    flexDirection:'column'
  },

  tarjetaRoja:{backgroundColor:'#FF6B6B'},
  TarjetaVerde:{backgroundColor:'#1fc427'},
  
});
