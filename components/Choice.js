import { View, Text } from "react-native";
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

const COLORS = {
  like: "#00eda6",
  nope: "#ff006f",
};

const Choice = ({ type }) => {

    const color = COLORS[type]

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
    <View>
      <Text
        style={{
          fontSize:48,
          fontFamily:"Lexend_600SemiBold",
          textTransform: "uppercase",
          letterSpacing:4,
          color: color
        }}
      >
        {type}
      </Text>
    </View>
  );
};

export default Choice;