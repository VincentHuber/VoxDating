import { FlatList, Image, SafeAreaView, Text, View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  doc,
  collection,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { storage } from "../firebase";

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
import { useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ChatMatchScreen({ navigation }) {
  const route = useRoute();

  const [recordingInProgress, setRecordingInProgress] = useState();
  const [recordingDone, setRecordingDone] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const [progress, setProgress] = useState();

  const [messages, setMessages] = useState([]);

  const [messagesFiltered, setMessagesFiltered] = useState([]);

  const [currentPlayingMessageId, setCurrentPlayingMessageId] = useState(null);

  const { userId, candidate } = route.params;

  const animation = useSharedValue(1);

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

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setRecordingInProgress(recording);
        animation.value = 25;
      }
    } catch (error) {
      console.log("Reccording error :", error);
    }
  }

  //Fonction pour arrêter l'enregistrement
  async function stopRecording() {
    setRecordingInProgress(null);
    animation.value = 0.8;
    try {
      await recordingInProgress.stopAndUnloadAsync();

      //autorise le son sur le haut-parleur
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        playsInSilentModeIOS: true,
      });

      const { sound, status } =
        await recordingInProgress.createNewLoadedSoundAsync();

      const uri = recordingInProgress.getURI();

      setRecordingDone({
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: uri,
      });

      //Enregistrement du son dans le storage et firebase
      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, "audioMessage/" + new Date().getTime());

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
        async () => {
          const audioURL = await getDownloadURL(uploadTask.snapshot.ref);

          // Met à jour le user dans Firestore avec l'URL du fichier audio
          if (userId && candidate.id) {
            await addDoc(collection(db, "messages"), {
              createdAt: Date.now(),
              sender: userId,
              receiver: candidate.id,
              audioProfile: audioURL,
              duration: getDurationFormatted(status.durationMillis),
            });
          } else {
            console.log("ID is undefined or null");
          }
          setRecordingDone("");
        }
      );
    } catch (error) {
      console.log("Error stopping recording: ", error);
    }
  }

  //Fonction pour formater la durée
  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10
      ? `${Math.floor(minutes)}:0${seconds}`
      : `${Math.floor(minutes)}:${seconds}`;
  }

  //Fonction pour jouer l'audio
  async function playRecording(audioURL, messageId) {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioURL },
        { shouldPlay: true }
      );

      setIsPlaying(true);
      setCurrentPlayingMessageId(messageId); // Mettre à jour l'ID du message en cours de lecture
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
          setCurrentPlayingMessageId(null);
        }
      });
      await sound.playAsync();
    } catch (error) {
      console.log("Error playing audio: ", error);
    }
  }

  //Récupère les messages
  useLayoutEffect(() => {
    const collectionRef = collection(db, "messages"); // Référence à la collection "chats"
    const q = query(collectionRef, orderBy("createdAt", "asc")); // Création d'une requête pour trier les messages par date de création

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // Abonnement aux modifications de la collection de chats
      const messagesData =
        // MAJ des messages avec les données reçues
        snapshot.docs.map((doc) => ({
          createdAt: doc.data().createdAt,
          audioProfile: doc.data().audioProfile,
          receiver: doc.data().receiver,
          sender: doc.data().sender,
          duration: doc.data().duration,
          id: doc.id,
        }));

      Promise.all(messagesData).then((eachMessage) => {
        setMessages(eachMessage);

        const filteredMessages = eachMessage.filter((message) => {
          return (
            (message.sender === candidate.id && message.receiver === userId) ||
            (message.sender === userId && message.receiver === candidate.id)
          );
        });
        setMessagesFiltered(filteredMessages);
      });
    });
    return unsubscribe; // Désabonnement lors du démontage du composant
  }, []);

  // Fonction pour rendre chaque message
  const renderMessage = ({ item }) => (
    <View
      style={{
        paddingHorizontal: 10,
        marginVertical: 2,
        alignItems: item.sender === userId ? "flex-end" : "flex-start",
      }}
    >
      <View
        key={item.id}
        style={{
          marginBottom: 2,
          paddingLeft: 12,
          paddingRight: 12,
          height: 50,
          width: 215,
          borderColor: "#F9F9F9",
          borderWidth: currentPlayingMessageId === item.id ? 0.8 : 0,
          borderRadius: 50,
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          backgroundColor: item.sender === userId ? "#6A29FF" : "black",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            playRecording(item.audioProfile, item.id);
          }}
          disabled={isPlaying}
          activeOpacity={1}
          style={{
            height: 30,
            aspectRatio: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 40,
            paddingLeft: currentPlayingMessageId === item.id ? 1 : 3,
            opacity: isPlaying && currentPlayingMessageId === item.id ? 0.5 : 1,
          }}
        >
          <FontAwesome5
            name={currentPlayingMessageId === item.id ? "pause" : "play"}
            size={14}
            color={item.sender === userId ? "#6A29FF" : "black"}
          />
        </TouchableOpacity>

        <Image
          source={require("../assets/freq.png")}
          style={{
            width: 74,
            height: 25,
          }}
        />

        <View
          style={{
            height: 30,
            width: 65,
            borderRadius: 30,
            backgroundColor: item.sender === userId ? "#4B1DB4" : "#292929",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Lexend_300Light",
              fontSize: 16,
            }}
          >
            +{item.duration}
          </Text>
        </View>
      </View>
    </View>
  );

  const listFooterComponent = () => <View style={{ height: 100 }} />;

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
          zIndex: -3,
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
            zIndex: -3,
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
          zIndex: -3,
        }}
      >
        Une fois que le micro est activé, ton message sera envoyé sans
        possibilité de le modifier.
      </Text>

      <View
        style={{
          marginTop: 30,
          paddingTop: 5,
          width: "90%",
          height: "60%",
          borderRadius: 15,
          backgroundColor: "#292929",
          zIndex: -3,
        }}
      >
        <FlatList
          data={messagesFiltered}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          ListFooterComponent={listFooterComponent}
          style={{ paddingTop: 5 }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          bottom: 20,
          zIndex: 1,
        }}
      >
        <TouchableOpacity
          onPress={recordingInProgress ? stopRecording : startRecording}
          activeOpacity={1}
          style={{
            backgroundColor: recordingInProgress ? "#6A29FF" : "white",
            height: 110,
            width: 110,
            borderRadius: 55,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {recordingInProgress ? (
            <FontAwesome5 name="stop" size={30} color="white" />
          ) : (
            <MaterialCommunityIcons name="microphone" size={60} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[
          {
            position: "absolute",
            width: 110,
            height: 110,
            bottom: 20,
            borderRadius: 100,
            zIndex: -1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "black",
            opacity: 0.8,
          },
          animationStyle,
        ]}
      />
    </SafeAreaView>
  );
}
