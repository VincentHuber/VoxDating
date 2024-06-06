import { Text, View, SafeAreaView } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { audioPause } from "../../reducers/pause";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import {
  useFonts,
  Lexend_900Black,
  Lexend_800ExtraBold,
  Lexend_700Bold,
  Lexend_600SemiBold,
  Lexend_500Medium,
  Lexend_400Regular,
  Lexend_300Light,
  Lexend_200ExtraLight,
  Lexend_100Thin,
} from "@expo-google-fonts/lexend";

const ChatScreen = () => {
  const dispatch = useDispatch();

  const idRef = useRef(null);

  const [likedCandidates, setLikedCandidates] = useState([]);

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

  // Fonction pour désactiver l'audio de candidate
  useEffect(() => {
    dispatch(audioPause(true));
  }, []);

  // Effet pour retrouver les id des likes du user
  useEffect(() => {
    const fetchUserData = async () => {
      if (idRef.current) {
        const userDocRef = doc(db, "users", idRef.current);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // Récupère tous les likes du user
          const userLikedId = userDoc.data().like || [];

          if (userLikedId.length === 0) {
            console.log("Aucun like trouvé pour cet utilisateur.");
          }

          // Récupère tous les profils des personnes likées par l'user
          const candidateLikedIdPromises = userLikedId.map((idLiked) =>
            getDoc(doc(db, "users", idLiked))
          );

          const candidateLikedDocs = await Promise.all(
            candidateLikedIdPromises
          );

          const mutualLikes = candidateLikedDocs
            .filter((doc) => {
              if (doc.exists()) {
                const candidateData = doc.data();

                if (candidateData.like && Array.isArray(candidateData.like)) {
                  return candidateData.like.includes(idRef.current);
                } else {
                  console.log(
                    "Le champ 'like' n'existe pas ou n'est pas un tableau dans le document du candidat:",
                    doc.id
                  );
                  return false;
                }
              } else {
                return false;
              }
            })
            .map((doc) => doc.data());

          setLikedCandidates(mutualLikes);
        } else {
          console.log("Le document utilisateur n'existe pas");
        }
      } else {
        console.log("idRef.current n'est pas défini");
      }
    };

    fetchUserData();
  }, [id]);

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
        backgroundColor: "black",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          width: "80%",
          marginTop: 10,

          textAlign: "center",
          fontFamily: "Lexend_900Black",
          fontSize: 34,
          color: "white",
        }}
      >
        LANCE LA DISCUSSION
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
        Retrouve ici tous tes matchs et tisse tes premiers liens.
      </Text>

      <View
        style={{
          marginTop: 30,
          width: "90%",
          backgroundColor: "#292929",
          borderRadius: 15,
        }}
      >
        {likedCandidates.length > 0 ? (
          likedCandidates.map((candidate, index) => (
            <TouchableOpacity
              key={index}
              style={{
                height: 75,
                borderBottomWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    marginHorizontal: 15,
                    height: 50,
                    width: 50,
                    borderRadius: 30,
                    alignItems: "center",
                    justifyContent:"center",
                    backgroundColor: "black",
                  }}
                >
                <MaterialIcons
                name="multitrack-audio"
                size={30}
                color={"white"}
              />

                </View>
                <Text
                  style={{
                    fontFamily: "Lexend_600SemiBold",
                    fontSize: 20,
                    color: "white",
                  }}
                >
                  {candidate.username}
                </Text>
              </View>
              <View
                style={{
                  width: 75,
                  height: 35,
                  borderRadius: 40,
                  backgroundColor: "#6A29FF",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight:15
                }}
              >
                <Text
                  style={{
                    fontFamily: "Lexend_600SemiBold",
                    fontSize: 18,
                    color: "white",
                  }}
                >
                  NEW
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ color: "white" }}>Aucun match pour le moment</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
