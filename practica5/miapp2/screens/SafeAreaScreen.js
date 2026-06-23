//Zona 1: Importaciones de componentes y archivos//
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, Switch } from 'react-native';

//Zona 2: Main Hogar de los componentes//
export default function SafeAreaScreen() {
  const [activo, setActivo] = useState(true);
  const Contenedor = activo ? SafeAreaView : View;

  return (
    <Contenedor style={styles.fondo}>
      <Text style={styles.titulo}>Safearea y scrollView</Text>
      <Text style={styles.description}>SafeArea view evita que el contenido pase la zona segura</Text>

      <View style={styles.fila}>
        <Text style={styles.etiqueta}>Activar safe area view</Text>
        <Switch
          value={activo}
          onValueChange={(valor) => setActivo(valor)}
        />
      </View>

      <Text style={styles.description}>ScrollView</Text>

      <ScrollView style={styles.lista}>
        <View style={[styles.tarjeta, { backgroundColor: 'red' }]}>
          <Text style={styles.textoTarjeta}>Elemento 1</Text>
        </View>
        <View style={[styles.tarjeta, { backgroundColor: 'blue' }]}>
          <Text style={styles.textoTarjeta}>Elemento 2</Text>
        </View>
        <View style={[styles.tarjeta, { backgroundColor: 'green' }]}>
          <Text style={styles.textoTarjeta}>Elemento 3</Text>
        </View>
        <View style={[styles.tarjeta, { backgroundColor: 'yellow' }]}>
          <Text style={styles.textoTarjeta}>Elemento 4</Text>
        </View>
        <View style={[styles.tarjeta, { backgroundColor: 'white' }]}>
          <Text style={styles.textoTarjeta}>Elemento 5</Text>
        </View>
        <View style={[styles.tarjeta, { backgroundColor: 'black' }]}>
          <Text style={styles.textoTarjeta}>Elemento 6</Text>
        </View>
        <View style={[styles.tarjeta, { backgroundColor: 'orange' }]}>
          <Text style={styles.textoTarjeta}>Elemento 7</Text>
        </View>
      </ScrollView>
    </Contenedor>
  );
}

//Zona 3: Estilos y posicionamiento//
const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 13,
    color: '#aaaaaa',
    textAlign: 'center',
    marginBottom: 12,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  etiqueta: {
    color: '#ffffff',
    fontSize: 14,
  },
  lista: {
    flex: 1,
  },
  tarjeta: {
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  textoTarjeta: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});