//tuto pour le swipe : www.youtube.com/watch?v=-3-mkvtEuf0

import {
  SafeAreaView,
  PanResponder,
  Dimensions,
  Animated,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Candidate from "../../components/Candidate";
import Footer from "../../components/Footer";

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
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height } = Dimensions.get("screen");

const FeedScreen = () => {
  const [id, setId] = useState(null);
  const [userFiltered, setUserFiltered] = useState([]);
  // const usersData = [];
  const swipe = useRef(new Animated.ValueXY()).current;
  const titlSign = useRef(new Animated.Value(1)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      titlSign.setValue(y0 > (height * 0.9) / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;
      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 500,
          toValue: { x: direction * 500, y: dy },
          useNativeDriver: true,
        }).start(removeTopCandidate);
      } else {
        Animated.spring(swipe, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCandidate = useCallback(() => {
    setUserFiltered((prevstate) => prevstate.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  const handleChoice = useCallback((direction) => {
    Animated.timing(swipe.x, {
      toValue: direction * 500,
      duration: 500,
      useNativeDriver: true,
    }).start(removeTopCandidate);
  }, [removeTopCandidate, swipe.x]);


  useEffect(() => {
    const fetchToken = async () => {
      try {
        let userData = await AsyncStorage.getItem("@user");
        if (userData !== null) {
          userData = JSON.parse(userData);
          setId(userData.uid);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur :", error);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getDocs(collection(db, "users"));
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
  }, []);


  useEffect(() => {
    const updateUserFiltered = () => {
      if (!userFiltered.length) { // Si userFiltered est vide
        const fetchUsersData = async () => { // Définition de fetchUsersData
          try {
            const allUsers = await getDocs(collection(db, "users"));
            const usersData = [];
            allUsers.forEach((user) => {
              const userObj = {
                username: user.data().username,
                gender: user.data().gender,
                audioProfile: user.data().audioProfile,
              };
              usersData.push(userObj);
            });
            setUserFiltered(usersData); // Mise à jour de userFiltered avec les données récupérées
          } catch (error) {
            console.log("error fetching users : ", error);
          }
        };
        fetchUsersData(); // Appel de fetchUsersData si userFiltered est vide
      }
    };
  
    updateUserFiltered();
  
    const intervalId = setInterval(updateUserFiltered, 1000);
  
    return () => clearInterval(intervalId);
  }, [userFiltered]);





// useEffect(()=>{
//   if(!userFiltered.length){
//     setUserFiltered(usersData)
//   }
// },[userFiltered.length])

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
      {userFiltered
        .map(({ username, audioProfile }, index) => {
          const isFirst = index === 0;
          const dragHandlers = isFirst ? panResponder.panHandlers : {};
          return (
            <Candidate
              key={index}
              username={username}
              audioProfile={audioProfile}
              isFirst={isFirst}
              swipe={swipe}
              titlSign={titlSign}
              {...dragHandlers}
            />
          );
        })
        .reverse()}
      <Footer handleChoice={handleChoice} />
    </SafeAreaView>
  );
};

export default FeedScreen;
