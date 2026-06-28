import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, Alert, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  // Estados para los TextInputs
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [semestre, setSemestre] = useState('');

  // Estados para las preguntas (Switch)
  const [taller, setTaller] = useState(false);
  const [constancia, setConstancia] = useState(false);
  const [deportes, setDeportes] = useState(false);


  const enviarRegistro = () => {
    // 1. Validar que no haya TextInputs vacíos
    if (!nombre.trim() || !carrera.trim() || !semestre.trim()) {
      Alert.alert('Error', 'No se permiten campos vacíos.');
      return;
    }

    
    if (isNaN(semestre)) {
      Alert.alert('Error', 'El semestre debe ser un valor numérico.');
      return;
    }

  
    Alert.alert(
      'Registro Exitoso',
      `Nombre: ${nombre}\nCarrera: ${carrera}\nSemestre: ${semestre}\nTaller: ${taller ? 'Sí' : 'No'}\nConstancia: ${constancia ? 'Sí' : 'No'}\nDeportes: ${deportes ? 'Sí' : 'No'}`
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Evento Universitario</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Nombre completo" 
        value={nombre} 
        onChangeText={setNombre} 
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Carrera" 
        value={carrera} 
        onChangeText={setCarrera} 
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Semestre" 
        keyboardType="numeric" 
        value={semestre} 
        onChangeText={setSemestre} 
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>¿Asistirá al taller?</Text>
        <Switch value={taller} onValueChange={setTaller} />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>¿Requiere constancia?</Text>
        <Switch value={constancia} onValueChange={setConstancia} />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>¿Participará en actividades deportivas?</Text>
        <Switch value={deportes} onValueChange={setDeportes} />
      </View>

      <Button title="Enviar Registro" onPress={enviarRegistro} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
  },
  signature: {
    textAlign: 'center',
    marginVertical: 20,
    fontStyle: 'italic',
    color: 'gray',
    fontWeight: 'bold',
  }
});