import {View,Text,TouchableOpacity,StyleSheet,SafeAreaView,} from "react-native";
import { Feather } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
export function VideoView({ handleClose, videoUrl }) {
  return (
    <SafeAreaView style={style.container}>
      <TouchableOpacity style={style.backbutton} onPress={handleClose}>
        <Feather name="arrow-left" size={24} color="#fff" />
        <Text style={style.backtext}>VOLTAR</Text>
      </TouchableOpacity>

      <WebView style={style.contentview} source={{ uri: videoUrl }} />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  backbutton: {
    width: "100%",
    backgroundColor: "#4cbe6c",
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingStart: 14,
  },
  backtext: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 500,
    marginLeft: 14,
  },
  contentview: {
    flex: 1,
    width: "100%",
  },
});
