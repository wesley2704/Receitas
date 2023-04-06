import {Text,StyleSheet } from "react-native";
import {View} from 'moti'
export  function Logo(){
    return(
        <View style={style.Logoarea}>
            <Text style={style.logo}>Receita Facil</Text>
        </View>

    )
}

const style= StyleSheet.create({
    Logoarea:{
        backgroundColor:'#4cbe60',
        alignSelf:'flex-start',
        padding:8,
        paddingLeft:16,
        paddingRight:20,
        borderTopRigthRadius:8,
        borderBottomLeftRadius:8,
        borderTopLeftRadius:8,
        borderBottomRightRadius:32,
        marginBottom:8,

    },
    logo:{
        fontSize:18,
        fontWeight:'bold',
        color:'#fff',
    }
});