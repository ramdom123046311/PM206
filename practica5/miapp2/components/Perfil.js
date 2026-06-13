import { Button,Text,Image,View } from "react-native";
import React,{useState} from "react";
//Perfil desustructuracion
export const Perfil= ({nombre,carrera,materia,cuatrimestre}) => {
   const [mostrar,setMostrar] = useState(false);
    //Renderizado condicional
    return (
        <View>
            <Text>{nombre}</Text>

            { mostrar && 
            <>
            <Text>{carrera}</Text>
            <Text>{materia}</Text>
            <Text>{cuatrimestre}</Text>
            </>
            }
            <Button
                title = "mostrar perfil"
                onPress= {()=> setMostrar(!mostrar)}
            />
        </View>
    );
}

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