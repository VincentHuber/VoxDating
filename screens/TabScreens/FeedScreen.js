//tuto pour le swipe : www.youtube.com/watch?v=-3-mkvtEuf0

import { SafeAreaView, PanResponder, Dimensions, Animated } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Candidate from "../../components/Candidate";
import Footer from "../../components/Footer";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  // Valeur pour suivre et animer la position (x et y) des éléments swipés.
  const swipe = useRef(new Animated.ValueXY()).current;
  
  //Valeur pour déterminer la direction du swipe
  const titlSign = useRef(new Animated.Value(1)).current;

  // Ajoutez un état pour suivre l'index du candidat affiché
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);


  // Configuration du PanResponder pour gérer les gestes de glissement
  const panResponder = PanResponder.create({  
  onMoveShouldSetPanResponder: () => true,  // Toujours autoriser le PanResponder à gérer le geste
    onPanResponderMove: (_, { dx, dy, y0 }) => {   // Déplacement du geste
      swipe.setValue({ x: dx, y: dy });  // Mise à jour de la position de l'animation
      titlSign.setValue(y0 > (height * 0.9) / 2 ? 1 : -1);  // Détermination de la direction du geste
    },
    onPanResponderRelease: (_, { dx, dy }) => { // Lorsque le geste est relâché
      const direction = Math.sign(dx);  // Lorsque le geste est relâché
      const isActionActive = Math.abs(dx) > 100;  // Vérifie si le geste est suffisant pour déclencher une action

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


// Fonction pour supprimer le candidat en haut de la pile et passer au suivant
const removeTopCandidate = useCallback(() => {
  setCurrentCandidateIndex((prevIndex) => prevIndex + 1);
  swipe.setValue({ x: 0, y: 0 }); // Réinitialise la position de l'animation
}, [swipe]);


  // Fonction pour gérer les choix de l'utilisateur
  const handleChoice = useCallback(
    (direction) => {
      Animated.timing(swipe.x, {  // Commence une animation sur la propriété x de swipe
        toValue: direction * 500, // Définit la valeur finale de l'animation
        duration: 500, // Définit la durée de l'animation en milliseconde
        useNativeDriver: true, // permet une meilleur fluidité d'animation
      }).start(removeTopCandidate); // Démarre l'animation et appelle removeTopCandidate à la fin
    },
    [removeTopCandidate, swipe.x]
  );


  //Fonction pour récupérer les users dans firestore
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getDocs(collection(db, "users")); // Récupération de tous les utilisateurs
        const usersData = [];
        allUsers.forEach((user) => {
          const userObj = {
            username: user.data().username,
            gender: user.data().gender,
            audioProfile: user.data().audioProfile,
          };
          usersData.push(userObj);
        });
        setUserFiltered(usersData);
      } catch (error) {
        console.log("error fetching users : ", error);
      }
    };
    fetchUsers();
  }, [!userFiltered.length]); 


  //Récupère l'id de l'user
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
      {userFiltered.length > 0 && (
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

      <Footer handleChoice={handleChoice} />
    </SafeAreaView>
  );
};

export default FeedScreen;
