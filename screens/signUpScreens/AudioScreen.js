//Tuto expo-av : www.youtube.com/watch?v=UKB-0wimchU&t=57s
//Tuto stocker media sur firebase : www.youtube.com/watch?v=cq5TGA6sBQQ

import {
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { storage } from "../../firebase";

import { Audio } from "expo-av";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

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

export default function AudioScreen({ navigation }) {

  // État pour suivre l'état de l'enregistrement en cours
  const [recordingInProgress, setRecordingInProgress] = useState();

  // État pour suivre l'état de l'enregistrement terminé
  const [recordingDone, setRecordingDone] = useState();

  // État pour savoir si un audio est en cours de lecture
  const [isPlaying, setIsPlaying] = useState(false);

  // État pour suivre la progression du chargement de l'audio
  const [progress, setProgress] = useState();

  //Valeur de l'id
  const [id, setId] = useState(null);

  // Définition de la valeur de l'animation
  const animation = useSharedValue(1);


  //Fonction pour décrire l'animation
  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(animation.value, {
            duration: 1000,
          }),
        },
      ],
    };
  });


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


  //Fonction pour enregistrer l'audio
  async function startRecording() {
    try {
      setRecordingDone(null);
      const perm = await Audio.requestPermissionsAsync();

      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        animation.value = 20;
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecordingInProgress(recording);
        
      }
    } catch (error) {
      console.log("Reccording error :", error);
    }
  }


  //Fonction pour arrêter l'enregistrement
  async function stopRecording() {
    animation.value = 0.8;
    
    await recordingInProgress.stopAndUnloadAsync();
    
    //autorise le son sur le haut-parleur
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      });
      const { sound, status } =
      await recordingInProgress.createNewLoadedSoundAsync();
      
      setRecordingDone({
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recordingInProgress.getURI(),
        });
        
        //Joue l'audio après l'avoir enregistré
        setIsPlaying(true);
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
            }
            });
            await sound.replayAsync();
            setRecordingInProgress(null);
  }

  //Fonction pour jouer l'audio
  async function playRecording() {
    setIsPlaying(true);
    const { sound } = recordingDone;
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    });
    await sound.replayAsync();
  }


  // Fonction pour mettre en pause
  async function pauseRecording() {
    setIsPlaying(false);
    await recordingDone.sound.pauseAsync();
  }


  //Fonction pour formater la durée
  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10
      ? `${Math.floor(minutes)}:0${seconds}`
      : `${Math.floor(minutes)}:${seconds}`;
  }


  //Fonction pour enregistrer l'audio dans Firestore
  async function audioFirestoreUpdate(uri, fileType) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "audioProfile/" + new Date().getTime());

    const uploadTask = uploadBytesResumable(storageRef, blob);

    // Surveille l'évolution du chargement
    uploadTask.on(
      "state_changed",
      // Callback appelée lorsqu'il y a un changement d'état
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress.toFixed());
      },
      (error) => {
        console.log("error : ", error);
      },
      // Callback appelée lorsque le chargement est terminé
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (audioURL) => {
          setRecordingDone("");

          // Met à jour le user dans Firestore avec l'URL du fichier audio
          if (id) {
            await updateDoc(doc(db, "users", id), {
              audioProfile: audioURL,
            });
            navigation.navigate("TabNavigator");
          } else {
            console.log("ID is undefined or null");
          }
        });
      }
    );
  }


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
        justifyContent: "space-between",
        backgroundColor: "black",
      }}
    >
      <View
        style={{
          width: "80%",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginTop: 25,

            textAlign: "center",
            fontFamily: "Lexend_900Black",
            fontSize: 34,
            color: "white",
          }}
        >
          PRÉSENTE-TOI
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
          Ta voix est ton unique moyen de séduire. 5 sec ou 2 min, c'est comme
          tu sens !
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={1}
        onPress={recordingInProgress ? stopRecording : startRecording}
        style={{
          width: "47%",
          aspectRatio: 1,
          borderRadius: 400,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "white",
          backgroundColor: "black",
          zIndex: 7,
        }}
      >
        {recordingInProgress ? (
          <FontAwesome5 name="stop" size={45} color="white" />
        ) : (
          <MaterialCommunityIcons name="microphone" size={70} color="white" />
        )}
      </TouchableOpacity>

      <Animated.View
        style={[
          {
            position: "absolute",
            width: 160,
            height: 160,
            bottom:"30.5%",

            borderRadius: 100,
            zIndex: 5,
            backgroundColor: "black",
            opacity: 0.8,
          },
          animationStyle,
        ]}
      />

      <View
        style={{
          flexDirection: "row",
          width: "80%",
          justifyContent: "space-around",
          marginBottom: 30,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            height: 55,
            width: 55,
            borderColor: "white",
            borderWidth: 1,
            borderRadius: 14,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={startRecording} disabled={!recordingDone}>
            <FontAwesome5
              name="redo-alt"
              size={24}
              color={!recordingDone ? "#383838" : "white"}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: 120,
            borderColor: "white",
            borderWidth: 1,
            borderRadius: 14,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={playRecording}
            disabled={!recordingDone || isPlaying}
          >
            <FontAwesome5
              name="play"
              size={24}
              color={!recordingDone || isPlaying ? "#383838" : "white"}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={pauseRecording} disabled={!recordingDone}>
            <FontAwesome5
              name="pause"
              size={24}
              color={!recordingDone ? "#383838" : "white"}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() =>
            recordingDone && audioFirestoreUpdate(recordingDone.file, "audio")
          }
          style={{
            height: 55,
            width: 55,
            borderRadius: 14,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#6A29FF",
          }}
          activeOpacity={0.2}
        >
          <Image
            source={require("../../assets/arrow.png")}
            style={{
              width: 16,
              height: 22,
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
