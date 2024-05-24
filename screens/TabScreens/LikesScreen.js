import {
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import React from "react";

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

export default function LikesScreen() {
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
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Text
        style={{
          width: "80%",
          marginTop: 25,

          textAlign: "center",
          fontFamily: "Lexend_900Black",
          fontSize: 34,
          color: "white",
        }}
      >
        DÉCOUVRE QUI T'AS LIKÉ
      </Text>

      <Text
        style={{
          width: "80%",
          marginTop: 20,

          textAlign: "center",
          fontFamily: "Lexend_400Regular",
          fontSize: 18,
          color: "white",
        }}
      >
        Active le Passe Premium et accède à la liste complète de toutes les
        personnes qui t'ont liké.
      </Text>
      <View
        style={{
          width: "80%",
          justifyContent: "space-around",
          marginTop: 40,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <View style={{ marginBottom: 25 }}>
          <TouchableOpacity
            style={{
              width: 120,
              height: 120,
              borderColor: "white",
              borderRadius: 100,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              width={120}
              height={150}
              source={require("../../assets/audio.png")}
              style={{ width: "41%", height: "50%" }}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,

              textAlign: "center",
              fontFamily: "Lexend_400Regular",
              fontSize: 18,
              color: "white",
            }}
          >
            SOPHIE
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={{
              width: 120,
              height: 120,
              borderColor: "white",
              borderRadius: 100,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              width={120}
              height={150}
              source={require("../../assets/audio.png")}
              style={{ width: "41%", height: "50%" }}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,

              textAlign: "center",
              fontFamily: "Lexend_400Regular",
              fontSize: 18,
              color: "white",
            }}
          >
            MARIE
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={{
              width: 120,
              height: 120,
              borderColor: "white",
              borderRadius: 100,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              width={120}
              height={150}
              source={require("../../assets/audio.png")}
              style={{ width: "41%", height: "50%" }}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,

              textAlign: "center",
              fontFamily: "Lexend_400Regular",
              fontSize: 18,
              color: "white",
            }}
          >
            ALEXANDRA
          </Text>
        </View>

        <View style={{ marginBottom: 25 }}>
          <TouchableOpacity
            style={{
              width: 120,
              height: 120,
              borderColor: "white",
              borderRadius: 100,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              width={120}
              height={150}
              source={require("../../assets/audio.png")}
              style={{ width: "41%", height: "50%" }}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,

              textAlign: "center",
              fontFamily: "Lexend_400Regular",
              fontSize: 18,
              color: "white",
            }}
          >
            JULIE
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={{
              width: 120,
              height: 120,
              borderColor: "white",
              borderRadius: 100,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              width={120}
              height={150}
              source={require("../../assets/audio.png")}
              style={{ width: "41%", height: "50%" }}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,

              textAlign: "center",
              fontFamily: "Lexend_400Regular",
              fontSize: 18,
              color: "white",
            }}
          >
            LOUISE
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={{
              width: 120,
              height: 120,
              borderColor: "white",
              borderRadius: 100,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              width={120}
              height={150}
              source={require("../../assets/audio.png")}
              style={{ width: "41%", height: "50%" }}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,

              textAlign: "center",
              fontFamily: "Lexend_400Regular",
              fontSize: 18,
              color: "white",
            }}
          >
            VICTOIRE
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
