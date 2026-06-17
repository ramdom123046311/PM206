import { Button,Text,Image,View,StyleSheet } from "react-native";
import React,{useState} from "react";
//Perfil desustructuracion
export const Perfil= ({nombre,carrera,materia,cuatrimestre,style}) => {
   const [mostrar,setMostrar] = useState(false);
    //Renderizado condicional
    return (
        <View style={[estilos.tarjeta,style]}>
            <Text style= {estilos.nombre}>{nombre}</Text>

            { mostrar && 
            <>
            <Text style={estilos.carrea}>{carrera}</Text>
            <Text style={estilos.otroTexto}>{materia}</Text>
            <Text style={estilos.otroTexto}>{cuatrimestre}</Text>
            </>
            }
            <Button
                title = "mostrar perfil"
                onPress= {()=> setMostrar(!mostrar)}
            />
        </View>
    );
}

const estilos = StyleSheet.create({
nombre:{
        fontSize:24,
        fontWeight: 700,
        textTransform:"uppercase"
   },
carrea:{
    fontSize: 18,
    color: 'blue',
    fontFamily:'roboto'
},

otroTexto:{

    fontSize: 12,
    fontFamily: 'Courier',
    fontStyle: 'italic'
},

tarjeta:{
   borderWidth: 3,
   margin: 20,
   padding:25,
},

});

/* export const Perfil= (props) =>{
    return(
        <View>
        
        <Text>{props.nombre}</Text>
        <Text>{props.carrera}</Text>
        <Text>{props.materia}</Text>
        <Text>{props.cuatrimestre}</Text>
        
        </View>
    )
} */