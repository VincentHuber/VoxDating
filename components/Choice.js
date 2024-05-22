import { View, Text } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';



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

const Choice = ({ name, type }) => {

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
    <View style={{justifyContent:"center", alignItems:"center"}}>
      <FontAwesome name= {name} size={40} color={color} />
      {/* <FontAwesomeIcon icon= {name} size={55} color={color}/> */}
    </View>
  );
};

export default Choice;