import { Text, View, Dimensions, Animated } from "react-native";
import React, { Fragment, useCallback } from "react";
import Choice from "./Choice";

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

const Candidate = ({ username, audioProfile, isFirst, swipe, titlSign, ...rest }) => {
  
  // Définition de l'animation de rotation basée sur la position du doigt
  const rotate = Animated.multiply(swipe.x, titlSign).interpolate({
    inputRange: [-100,0,100],
    outputRange : ['8deg', '0deg', '-8deg']
  })
  
  // Style animé pour le candidat, incluant la transformation de rotation et de translation
  const animatedCandidateStyle = {
    transform : [...swipe.getTranslateTransform(), {rotate}]
  }

  // Opacité pour l'affichage du choix "like"
  const likeOpacity = swipe.x.interpolate({
    inputRange:[25, 100],
    outputRange:[0,1],
    extrapolate: 'clamp'
  })

  // Opacité pour l'affichage du choix "nope" 
  const nopeOpacity = swipe.x.interpolate({
    inputRange:[-100, -25],
    outputRange:[1,0],
    extrapolate: 'clamp'
  })

  //Mémoriser la fonction renderChoice
  const renderChoice = useCallback(() => {
    return (
      <Fragment>
        <Animated.View
          style={{
            position: "absolute",
            top: 100,
            left: 45,
            transform: [{ rotate: "-30deg" }],
            opacity:likeOpacity
          }}
        >
          <Choice type="like" />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            top: 100,
            right: 45,
            transform: [{ rotate: "30deg" }],
            opacity:nopeOpacity
          }}
        >
          <Choice type="nope" />
        </Animated.View>
      </Fragment>
    );
  },[likeOpacity, nopeOpacity]);

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
    <Animated.View
      style={{
        position: "absolute",
        backgroundColor: "black",
        width: "100%",
        height: "100%",
        borderRadius: 15,
        alignItems: "center",
       
        ...(isFirst ? animatedCandidateStyle : {})        
        // borderColor:"red",
        // borderWidth:1
      }} {...rest}
    >
      <Text
        style={{
          marginTop: 50,
          fontFamily: "Lexend_200ExtraLight",
          letterSpacing: 2,
          color: "white",
          fontSize: 40,
          textAlign: "center",
          textTransform: "uppercase",
        }}
      >
        {username}
      </Text>
      <Text
        style={{
          color: "white",
          marginTop: 200,
          fontSize: 10,
          width: 200,
          textAlign: "center",
        }}
      >
        {audioProfile}
      </Text>
      {isFirst && renderChoice()}
    </Animated.View>
  );
};

export default Candidate;