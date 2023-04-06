
import { useState,useEffect} from 'react'
import { View,Text,StyleSheet ,FlatList} from "react-native";
import { useRoute } from "@react-navigation/native";

import api from '../../services/api';
import  FoodList from '../../components/FoodList'
export default function Search() {
    const route = useRoute ()
    const [receipes,setReceipes] = useState([])
    
    useEffect(() => {
        async function fetchReceipes(){
            const response = await api.get(`/foods?name_like=${route.params?.name}`)
            setReceipes(response.data)
        
        }
        fetchReceipes()

        },[route.params?.name])

        return (

        <View style={styles.container}>
        <FlatList  
        showsVerticaScrollIndicator={false}
        data={receipes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => <FoodList data={item}/>}
        ListEmptyComponent={() => <Text  style={styles.Text}>NAO ENCONTRADO</Text>}
        />
        </View>

  );
}
const styles = StyleSheet.create({
    container:{
       flex:1,
       backgroundColor:"#f3f4ff",
       paddingStart:14,
       paddingEnd:14,
       paddingTop:14,

    },
    Text:{
        fontSize:16,
        backgroundColor:'red'

    }
})