import { Text, Animated, View, TouchableWithoutFeedback } from "react-native";
import React, { useCallback, useEffect, useState, useRef } from "react";
import Choice from "./Choice";
import { Audio } from "expo-av";
import AudioVisualisation from "./AudioVisualisation";
import { useSelector, useDispatch } from "react-redux";
import { audioPause } from "../reducers/pause";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

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
  usersId,
  ...rest
}) => {
  const soundRef = useRef(null);

  const idRef = useRef(null);

  const [isSoundLoaded, setIsSoundLoaded] = useState(false);

  const [play, setPlay] = useState(false);

  const [tabPlay, setTabPlay] = useState(true);

  const [currentVolume, setCurrentVolume] = useState(0);

  const pause = useSelector((state) => state.pause.value);

  const dispatch = useDispatch();

  //Valeur de l'id
  const [id, setId] = useState(null);

  //Récupère l'id dans l'AsyncStorage
  useEffect(() => {
    const fetchToken = async () => {
      try {
        let userData = await AsyncStorage.getItem("@user");
        if (userData !== null) {
          userData = JSON.parse(userData);
          setId(userData.uid);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur :",
          error
        );
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (id !== null) {
      idRef.current = id;
    }
  }, [id]);

  // Fonction pour activer l'audio de candidate
  useEffect(() => {
    dispatch(audioPause(false));
  }, [audioPause, dispatch]);

  // Fonction pour charger et lire l'audio
  const loadAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });

      const { sound } = await Audio.Sound.createAsync({ uri: audioProfile }); // Charge le son depuis l'URI
      soundRef.current = sound; // Stocke le son dans la référence
      setIsSoundLoaded(true);
      await sound.playAsync();
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  // useEffect pour charger l'audio à la création du composant
  useEffect(() => {
    loadAudio();

    return () => {
      if (soundRef.current) {
        soundRef.current.stopAsync();
        soundRef.current.unloadAsync();
      }
    };
  }, [audioProfile]);

  // useEffect pour rejouer le son une fois qu'il est chargé
  useEffect(() => {
    if (soundRef.current && isSoundLoaded) {
      const replaySound = async () => {
        try {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: true,
          });
          await soundRef.current.replayAsync({ isLooping: true });
        } catch (error) {
          console.error("Error replaying sound:", error);
        }
      };
      replaySound();
    }
  }, [isSoundLoaded]);

  // Fonction pour mettre en pause ou lire l'audio au clic
  async function pauseRecording() {
    setPlay(!play);
    if (!play) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.replayAsync({ isLooping: true });
    }
  }

  //Trouver le volume du son
  useEffect(() => {
    const monitorVolume = async () => {
      if (soundRef.current) {
        const status = await soundRef.current.getStatusAsync();
        if (status.isPlaying) {
          setCurrentVolume(status.volume);
        } else {
          setCurrentVolume(0);
        }
      }
    };

    const interval = setInterval(monitorVolume, 500);

    return () => clearInterval(interval);
  }, [isSoundLoaded]);

  // Fonction pour mettre en pause ou lire l'audio au clic sur le tab
  async function pauseTabRecording() {
    if (tabPlay) {
      await soundRef.current.pauseAsync();
    } else {
      await soundRef.current.replayAsync({ isLooping: true });
    }
  }

  //Fontion pour mettre en pause au click sur une tab.screen
  useEffect(() => {
    const handlePlayPause = async () => {
      if (soundRef.current) {
        if (pause) {
          await soundRef.current.pauseAsync();
        } else {
          await soundRef.current.playAsync();
        }
      }
    };
    handlePlayPause();
  }, [pause]);

  // Définition de l'animation de rotation
  const rotate = Animated.multiply(swipe.x, titlSign).interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ["8deg", "0deg", "-8deg"],
  });

  //Fonction pour créer une action en fonction de la position de la carte
  useEffect(() => {
    let likeSent = false;

    const swipeListener = swipe.x.addListener(({ value }) => {
      if (value > 100 && !likeSent) {
        if (idRef.current) {
          // Récupérer le document utilisateur actuel
          const userDocRef = doc(db, "users", idRef.current);

          // Récupérer le document utilisateur
          getDoc(userDocRef)
            .then((docSnapshot) => {
              if (docSnapshot.exists()) {
                // Obtenir le champ 'like' du document
                const currentLikes = docSnapshot.data().like || [];

                if (!currentLikes.includes(usersId)) {
                  // Ajouter une nouvelle valeur à 'like'
                  const updatedLikes = [...currentLikes, usersId];

                  // Mettre à jour le document avec le nouveau tableau 'like'
                  return updateDoc(userDocRef, {
                    like: updatedLikes,
                  });
                }
              } else {
                console.log("Le document utilisateur n'existe pas.");
              }
            })
            .catch((error) => {
              console.error(
                "Erreur lors de la mise à jour du document :",
                error
              );
            });
        }
        likeSent = true;
      } else if (value < -100 && !likeSent) {
        likeSent = true;
      }
    });

    return () => {
      swipe.x.removeListener(swipeListener);
    };
  }, [swipe.x]);

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
      <TouchableWithoutFeedback onPress={pauseRecording}>
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
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

          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              zIndex: -5,
            }}
          >
            <AudioVisualisation currentVolume={currentVolume} />
          </View>

          {isFirst && renderChoice()}
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default Candidate;
