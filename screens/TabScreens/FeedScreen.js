//tuto pour le swipe : www.youtube.com/watch?v=-3-mkvtEuf0

import { SafeAreaView, PanResponder, Dimensions, Animated } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Candidate from "../../components/Candidate";
import Footer from "../../components/Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDoc, doc } from "firebase/firestore";

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

// Récupération de la hauteur de l'écran pour les calculs d'animations
const { height } = Dimensions.get("screen");

const FeedScreen = () => {
  //Valeur de l'id
  const [id, setId] = useState(null);

  // État pour stocker les utilisateurs filtrés
  const [userFiltered, setUserFiltered] = useState([]);

  // Valeur pour animer la position (x et y) des éléments swipés.
  const swipe = useRef(new Animated.ValueXY()).current;

  // Valeur pour animer le swipe
  const titlSign = useRef(new Animated.Value(1)).current;

  // Valeur pour animer l'opacité
  const fade = useRef(new Animated.Value(0)).current;

  // Valeur pour animer l'échelle
  const scale = useRef(new Animated.Value(0.8)).current;

  // Ajoutez un état pour suivre l'index du candidat affiché
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);

  const [userWishedGender, setUserWishedGender] = useState(null);

  
  //Fonction pour récupérer le genre souhaité du users
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let userData = await AsyncStorage.getItem("@user");
        if (userData !== null) {
          userData = JSON.parse(userData);
          if (userData.uid) {
            let userDoc = await getDoc(doc(db, "users", userData.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUserWishedGender(userData.wishedGender);
            }
          }
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur :",
          error
        );
      }
    };

      fetchUserData();

  }, [id]);

  //Fonction pour récupérer les users dans firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {

        if (userWishedGender) {
          // Récupère tous les documents dans la collection "users" de Firestore
          const allUsers = await getDocs(collection(db, "users"));
          // Initialise un tableau vide pour stocker les utilisateurs filtrés
          const usersData = [];

          allUsers.forEach((user) => {

            if (user.data().wishedGender && userWishedGender) {

              // Vérifie si au moins un élément de userWishedGender est inclus dans user.data().wishedGender
              if ( userWishedGender.some((gender) => user.data().gender.includes(gender)) ) {
                const userObj = {
                  username: user.data().username,
                  gender: user.data().gender,
                  audioProfile: user.data().audioProfile,
                };
                // Ajoute l'objet utilisateur au tableau usersData
                usersData.push(userObj);
              }
            }
          });
          // Met à jour l'état userFiltered avec le tableau des utilisateurs filtrés
          setUserFiltered(usersData);
          
        }
      } catch (error) {
        console.log("error fetching users : ", error);
      }
    };
    fetchUsers();
  }, [userWishedGender]);

// Configuration du PanResponder pour gérer les gestes de glissement
const panResponder = PanResponder.create({
  onMoveShouldSetPanResponder: () => true, // Toujours autoriser le PanResponder à gérer le geste
  onPanResponderMove: (_, { dx, dy, y0 }) => {
    // Déplacement du geste
    swipe.setValue({ x: dx, y: dy }); // Mise à jour de la position de l'animation
    titlSign.setValue(y0 > (height * 0.9) / 2 ? 1 : -1); // Détermination de la direction du geste
  },
  onPanResponderRelease: (_, { dx, dy }) => {
    // Lorsque le geste est relâché
    const direction = Math.sign(dx); // Lorsque le geste est relâché
    const isActionActive = Math.abs(dx) > 100; // Vérifie si le geste est suffisant pour déclencher une action

    // Si le geste est suffisant, lancer l'animation pour retirer la carte
    if (isActionActive) {
      Animated.timing(swipe, {
        duration: 500,
        toValue: { x: direction * 500, y: dy },
        useNativeDriver: true,
      }).start(removeTopCandidate);
      // Sinon, revenir à la position initiale
    } else {
      Animated.spring(swipe, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: true,
        friction: 5,
      }).start();
    }
  },
});

// Fonction pour effectuer l'animation d'opacité et d'échelle
useEffect(() => {
  const fadeIn = () => {
    fade.setValue(0);
    Animated.timing(fade, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const scaleIn = () => {
    scale.setValue(0.98);
    Animated.spring(scale, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  scaleIn();
  fadeIn();
}, [currentCandidateIndex, userFiltered]);

// Fonction pour supprimer le candidat en haut de la pile et passer au suivant
const removeTopCandidate = useCallback(() => {
  setCurrentCandidateIndex((prevIndex) => prevIndex + 1);
  swipe.setValue({ x: 0, y: 0 }); // Réinitialise la position de l'animation
}, [swipe]);

// Fonction pour gérer les choix de l'utilisateur
const handleChoice = useCallback(
  (direction) => {
    Animated.timing(swipe.x, {
      toValue: direction * 500,
      duration: 500,
      useNativeDriver: true,
    }).start(removeTopCandidate);
  },
  [removeTopCandidate, swipe.x]
);


// Fonction pour réinitialiser l'index du candidat une fois qu'ils ont tous été vus
useEffect(() => {
  const resetCandidateIndex = () => {
    if (currentCandidateIndex >= userFiltered.length) {
      setCurrentCandidateIndex(0);
    }
  };

  resetCandidateIndex();
}, [currentCandidateIndex, userFiltered]);


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
      <Animated.View
        style={{
          alignItems: "center",
          height: "100%",
          width: "100%",
          opacity: fade,
          transform: [{ scale }],
        }}
      >
        {userFiltered.length > 0 && userFiltered[currentCandidateIndex] && (
          <Candidate
            key={currentCandidateIndex}
            username={userFiltered[currentCandidateIndex].username}
            audioProfile={userFiltered[currentCandidateIndex].audioProfile}
            isFirst={true}
            swipe={swipe}
            titlSign={titlSign}
            {...panResponder.panHandlers}
          />
        )}
      </Animated.View>
      <Footer handleChoice={handleChoice} />
    </SafeAreaView>
  );
};

export default FeedScreen;
