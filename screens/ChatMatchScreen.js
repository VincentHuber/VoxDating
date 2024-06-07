import { Image, SafeAreaView, Text, View } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import {
  useFonts,
  Lexend_900Black,
  Lexend_800ExtraBold,
  Lexend_700Bold,
  Lexend_600SemiBold,
  Lexend_400Regular,
  Lexend_500Medium,
  Lexend_300Light,
  Lexend_200ExtraLight,
  Lexend_100Thin,
} from "@expo-google-fonts/lexend";
import { useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ChatMatchScreen({ navigation }) {
  const route = useRoute();
  const { userId, candidate } = route.params;

  //Chargement de la police
  const [fontsLoaded] = useFonts({
    Lexend_900Black,
    Lexend_800ExtraBold,
    Lexend_700Bold,
    Lexend_600SemiBold,
    Lexend_500Medium,
    Lexend_400Regular,
    Lexend_300Light,
    Lexend_200ExtraLight,
    Lexend_100Thin,
  });

  //Attente de le chargement de la police
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "black", alignItems: "center" }}
    >
      <View
        style={{
          width: "90%",
          marginTop: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            alignItems: "flex-end",
            justifyContent: "center",
            transform: [{ rotate: "180deg" }],
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image
            source={require("../assets/arrow.png")}
            style={{
              width: 16,
              height: 22,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontFamily: "Lexend_900Black",
            fontSize: 34,
            textTransform: "uppercase",
          }}
        >
          {candidate.username}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <Text
        style={{
          width: "80%",
          marginTop: 22,

          textAlign: "center",
          fontFamily: "Lexend_400Regular",
          fontSize: 18,
          color: "white",
        }}
      >
        Une fois que le micro est activé, ton message sera envoyé sans
        possibilité de le modifier.
      </Text>

      <View
        style={{
          marginTop: 30,
          width: "90%",
          height: "60%",
          borderRadius: 15,
          backgroundColor: "#292929",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height:50
          }}
        >
          <View style={{ height: 0.5, width: "17%", backgroundColor: "white"}} />
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontFamily: "Lexend_300Light",
              fontSize: 13,
              marginHorizontal:13,
            }}
          >
            Aujourd'hui
          </Text>
          <View style={{ height: 0.5, width: "17%", backgroundColor: "white" }} />
        </View>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 20,
          zIndex: 1,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            height: 110,
            width: 110,
            borderRadius: 55,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons name="microphone" size={60} color="black" />
        </TouchableOpacity>
      </View>
      {/* <Text style={{ color: "white" }}>{userId}</Text>
      <Text style={{ color: "white" }}>{candidate.id}</Text> */}
    </SafeAreaView>
  );
}
