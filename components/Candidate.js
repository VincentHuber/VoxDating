import { Text, Animated, View } from "react-native";
import React, { useCallback, useEffect, useState, useRef } from "react";
import Choice from "./Choice";
import { Audio } from "expo-av";

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

const Candidate = ({
  username,
  audioProfile,
  isFirst,
  swipe,
  titlSign,
  ...rest
}) => {
  const soundRef = useRef(null);
  const [isSoundLoaded, setIsSoundLoaded] = useState(false);

  // Fonction pour charger et lire l'audio
  const loadAudio = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioProfile }); // Charge le son depuis l'URI
      console.log("Sound loaded successfully:", sound);
      soundRef.current = sound; // Stocke le son dans la référence
      setIsSoundLoaded(true);
      await sound.playAsync(); // Lit le son en boucle
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  // useEffect pour charger l'audio à la création du composant
  useEffect(() => {
    console.log("Executing useEffect to load audio");
    loadAudio();

    return () => {
      if (soundRef.current) {
        console.log("Stopping and unloading sound...");
        soundRef.current.stopAsync(); // Arrête la lecture du son lorsque le composant est démonté
        soundRef.current.unloadAsync(); // Décharge le son pour nettoyer les ressources
      }
    };
  }, [audioProfile]);

  // useEffect pour rejouer le son une fois qu'il est chargé
  useEffect(() => {
    if (soundRef.current && isSoundLoaded) {
      const replaySound = async () => {
        try {
          console.log("Replaying sound...");
          await soundRef.current.replayAsync({ isLooping: true });
        } catch (error) {
          console.error("Error replaying sound:", error);
        }
      };
      replaySound();
    }
  }, [isSoundLoaded]);

  // Définition de l'animation de rotation
  const rotate = Animated.multiply(swipe.x, titlSign).interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ["8deg", "0deg", "-8deg"],
  });

  // La carte suit le mouvement du doigt
  const animatedCandidateStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };

  // Opacité en fonction de la position du doigt pour "like"
  const likeOpacity = swipe.x.interpolate({
    inputRange: [25, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  // Opacité en fonction de la position du doigt pour "nope"
  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-100, -25],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  // Fonction pour le rendu animé des choix "like" et "nope"
  const renderChoice = useCallback(() => {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            opacity: likeOpacity,
          }}
        >
          <Choice name="heart" type="like" />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            opacity: nopeOpacity,
          }}
        >
          <Choice name="times" type="nope" />
        </Animated.View>
      </View>
    );
  }, [likeOpacity, nopeOpacity]);

  // Chargement de la police
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

  // Attente de le chargement de la police
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
        ...(isFirst ? animatedCandidateStyle : {}),
      }}
      {...rest}
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
