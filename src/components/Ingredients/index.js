
import { View ,Text,StyleSheet} from 'react-native';

export function Ingredients({data}) {
 return (
   <View style={Style.container}>
    <Text style={Style.name}>{data.name}</Text>
    <Text>{data.amount}</Text>
   </View>
  );
}

const Style = StyleSheet.create({
    container:{
        backgroundColor:'#FFF',
        marginBottom:14,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:12,
        borderRadius:4,


    },
    name:{
        fontWeight:500,
        fontSize:16,
       

    }
})