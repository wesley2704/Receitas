import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  Modal,
  Share,
} from "react-native";
import { useLayoutEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import { Ingredients } from "../../components/Ingredients";
import { Instructions } from "../../components/Instructions";

import { VideoView } from "../../components/Video";
import { isFavorite, saveFavorites, removeItem } from "../../Utils/index";

export default function Detail() {
  const Route = useRoute();
  const navigation = useNavigation();
  //modal
  const [showVideo, setShowVideo] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useLayoutEffect(() => {
    async function getStatusFavorites() {
      const receipeFavorite = await isFavorite(Route.params?.data);
      setFavorite(receipeFavorite);
    }
    getStatusFavorites();

    navigation.setOptions({
      title: Route.params?.data
        ? Route.params?.data.name
        : "Detalhes da receita",
      headerRight: () => (
          <Pressable onPress={() => handleFavoriteReceipe(Route.params?.data)}>
          {favorite ? (
            <Entypo 
            name="heart" 
            size={28} 
            color="#ff4141" 
            />
          ) : (
            <Entypo 
            name="heart-outlined"
            size={28} 
            color="#ff4141" 
            /> 
          )}
        </Pressable>
      ),
    });
  }, [navigation, Route.params?.data,favorite]);

  async function handleFavoriteReceipe(receipe){
  if( favorite){
    await removeItem(receipe.id)
    setFavorite(false)

  }else{
    await saveFavorites("@appreceitas", receipe)
    setFavorite(true)

  }
  }

  function handleOpenvideo() {
    setShowVideo(true);
  }

  //funçao compartilhar
  async function shareReceipe() {
    try {
      await Share.share({
        url: "https://sujeitoprogramador.com",
        message: `receita${Route.params?.data.name} \nIngredientes : ${Route.params?.data.total_ingredients}\n via la no App receita facil`,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBotton: 14 }}
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Pressable onPress={handleOpenvideo}>
        <View style={styles.playIcon}>
          <AntDesign name="playcircleo" size={90} color="#fff" />
        </View>
        <Image
          source={{ uri: Route.params?.data.cover }}
          style={styles.cover}
        />
      </Pressable>

      <View style={styles.headerDetails}>
        <View>
          <Text style={styles.title}>{Route.params?.data.name}</Text>
          <Text style={styles.ingredientsText}>
            Ingredientes({Route.params?.data.total_ingredients})
          </Text>
        </View>
        <Pressable onPress={shareReceipe}>
          <Feather name="share-2" size={24} color="#121212" />
        </Pressable>
      </View>

      {Route.params?.data.ingredients.map((item) => (
        <Ingredients key={item.id} data={item} />
      ))}

      <View style={styles.InstructionsArea}>
        <Text style={styles.InstructionsText}>Modo de preparo</Text>
        <Feather name="arrow-down" size={24} color="#fff" />
      </View>

      {Route.params?.data.instructions.map((item, index) => (
        <Instructions key={item.id} data={item} index={index} />
      ))}

      <Modal visible={showVideo} animationType="slide">
        <VideoView
          handleClose={() => setShowVideo(false)}
          videoUrl={Route.params?.data.video}
        />
      </Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f9ff",
    paddingTop: 14,
    paddingEnd: 14,
    paddingStart: 14,
  },
  cover: {
    height: 200,
    borderRadius: 14,
    width: "100%",
  },
  playIcon: {
    position: "absolute",
    zIndex: 9,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    marginTop: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  ingredientsText: {
    marginBottom: 14,
    fontSize: 16,
  },
  headerDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  InstructionsArea: {
    backgroundColor: "#4cbe6c",
    flexDirection: "row",
    padding: 8,
    borderRadius: 4,
    marginBottom: 14,
  },
  InstructionsText: {
    fontSize: 18,
    fontWeight: 500,
    color: "#fff",
    marginRight: 8,
  },
});
