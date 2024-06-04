import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";

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

const COLORS = {
  like: "#6A29FF",
  nope: "#6A29FF",
};

const Choice = ({ name, type }) => {
  const color = COLORS[type];


  // useEffect(() => {
  //   console.log("Color:", color);
  //   console.log("Type:", type);
  //   if (color && type) {
  //     const match = () => {
  //       if (type === "like") {
  //         console.log("YES");
  //       } else if (type === "nope") {
  //         console.log("NOPE");
  //       }
  //     };
  //     match();
  //   }
  // }, [color, type]);

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
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FontAwesome name={name} size={45} color={color} />
    </View>
  );
};

export default Choice;
