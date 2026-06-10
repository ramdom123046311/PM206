import { Button,Text,Image,View } from "react-native";

export const Saludo2= () =>{
    return(
        <View>
        <Image source={require('../assets/wave.png')}/>
        <Text>Hola soy un componente propio</Text>
        <Button title="Hola 206"></Button>
        </View>
    )
}