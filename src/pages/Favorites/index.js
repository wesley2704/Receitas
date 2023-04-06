import { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView,FlatList } from "react-native";
import { getFavorites } from "../../Utils/index";
import { useIsFocused } from "@react-navigation/native";
import FoodList from '../../components/FoodList'
export default function Favorites() {
  const [receipes, setReceipes] = useState([]);
  const IsFocused = useIsFocused();

  useEffect(() => {
    let isActive = true;

    async function getReceipes() {
      const result = await getFavorites("@appreceitas");
      if (isActive) {
        setReceipes(result);
      }
    }
    if (isActive){
        getReceipes()
    }

    return()=> {

        isActive = false
    }  
    }, [IsFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Receitas Favoritas</Text>

      {receipes.length === 0 && (
      <Text>Voce nao tem nenhuma receita salva</Text>
      )}

      <FlatList  
      showsVerticaScrollIndicator={false}
      style={{marginTop:14}}
      data={receipes}
      keyExtractor={(item) => String(item.id)}
      renderItem={({item}) => <FoodList data={item}
      />}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f9ff",
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 36,
  },
  title: {
    color: "#000",
    fontSize: "bold",
    fontSize: 24,
  },
});
