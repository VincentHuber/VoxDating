import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { auth } from "../../firebase";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import {useDispatch} from 'react-redux'
import {audioPause} from "../../reducers/pause";

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

const ProfilScreen = () => {
  //Valeur de l'id
  const [id, setId] = useState(null);

  const [user, setUser] = useState(null);

  const dispatch = useDispatch()

  const navigation = useNavigation();

  const windowHeight = useWindowDimensions().height;



  useEffect(()=>{
    dispatch(audioPause(true))
  },[])

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

  //Fonction pour récupérer les infos de l'user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (id) {
          const userDoc = await getDoc(doc(db, "users", id));

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser(userData);
          }
        }
      } catch (error) {
        console.log("error fetching user : ", error);
      }
    };
    fetchUser();
  }, [id]);

  //Calcul de la hauteur de la fenêtre
  const smallScreen = 700;
  let paddingBottomFactor;

  if (windowHeight < smallScreen) {
    paddingBottomFactor = 0.22;
  } else {
    paddingBottomFactor = 0.13;
  }

  const paddingBottom = windowHeight * paddingBottomFactor;

  // Fonction pour se déconnecter
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null)
        setId(null)
        AsyncStorage.clear()
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

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
        backgroundColor: "black",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          paddingBottom: paddingBottom,
          alignItems: "center",
        }}
        style={{
          flex: 1,
          width: "100%",
          }}
      >
        <Text
          style={{
            fontFamily: "Lexend_900Black",
            fontSize: 34,
            textAlign:"center",
            color: "white",
            marginTop: 20,
          }}
        >
          CONSULTE {"\n"}TON COMPTE
        </Text>

        <Text
        style={{
          width: "80%",
          marginTop: 22,

          textAlign: "center",
          fontFamily: "Lexend_400Regular",
          fontSize: 18,
          color: "white",
        }}
      >
        Vérifie tes données et assure-toi qu'elles sont à jour.
      </Text>


        <View
          style={{
            marginTop: 30,
            height: 277,
            width: "80%",
            backgroundColor: "#292929",
            borderRadius: 15,
            alignItems: "center",
          }}
        >
          {user ? (
            <>
              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 54,
                  paddingRight: 8,
                  paddingLeft: 23,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#989898",
                    fontFamily: "Lexend_400Regular",
                    fontSize: 16,
                  }}
                >
                  Pseudo
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Lexend_600SemiBold",
                      fontSize: 16,
                      marginRight: 5,
                    }}
                  >
                    {user.username && user.username.length > 12
                      ? user.username.substring(0, 12) + "..."
                      : user.username}
                  </Text>
                  <MaterialIcons
                    name="navigate-next"
                    size={26}
                    color="#989898"
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{ height: 1, width: "100%", backgroundColor: "black" }}
              />

              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 54,
                  paddingRight: 8,
                  paddingLeft: 23,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#989898",
                    fontFamily: "Lexend_400Regular",
                    fontSize: 16,
                  }}
                >
                  Âge
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Lexend_600SemiBold",
                      fontSize: 16,
                      marginRight: 5,
                    }}
                  >
                    {user.age}
                  </Text>
                  <MaterialIcons
                    name="navigate-next"
                    size={26}
                    color="#989898"
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{ height: 1, width: "100%", backgroundColor: "black" }}
              />

              <TouchableOpacity
                style={{
                  width: "100%",
                  height: 54,
                  paddingRight: 8,
                  paddingLeft: 23,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#989898",
                    fontFamily: "Lexend_400Regular",
                    fontSize: 16,
                  }}
                >
                  Localisation
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Lexend_600SemiBold",
                      fontSize: 16,
                      marginRight: 5,
                    }}
                  >
                    {user.locationWriten && user.locationWriten.length > 12
                      ? user.locationWriten.substring(0, 12) + "..."
                      : user.locationWriten}
                  </Text>
                  <MaterialIcons
                    name="navigate-next"
                    size={26}
                    color="#989898"
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{ height: 1, width: "100%", backgroundColor: "black" }}
              />

              <TouchableOpacity
                style={{
                  width: "100%",
                  paddingRight: 8,
                  paddingLeft: 23,
                  height: 54,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#989898",
                    fontFamily: "Lexend_400Regular",
                    fontSize: 16,
                  }}
                >
                  Genre
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Lexend_600SemiBold",
                      fontSize: 16,
                      marginRight: 5,
                    }}
                  >
                    {user.gender}
                  </Text>
                  <MaterialIcons
                    name="navigate-next"
                    size={26}
                    color="#989898"
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{ height: 1, width: "100%", backgroundColor: "black" }}
              />

              <TouchableOpacity
                style={{
                  width: "100%",
                  paddingRight: 8,
                  paddingLeft: 23,
                  height: 54,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#989898",
                    fontFamily: "Lexend_400Regular",
                    fontSize: 16,
                  }}
                >
                  Genre souhaité
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Lexend_600SemiBold",
                      fontSize: 16,
                      marginRight: 5,
                    }}
                  >
                    {user.wishedGender && user.wishedGender.length > 1
                      ? user.wishedGender[0] + "..."
                      : user.wishedGender}
                  </Text>
                  <MaterialIcons
                    name="navigate-next"
                    size={26}
                    color="#989898"
                  />
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={{ color: "white" }}>
              Chargement des données utilisateur...
            </Text>
          )}
        </View>

        <View
          style={{
            marginTop: 10,
            height: 50,
            width: "80%",
            backgroundColor: "#292929",
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: "85%",
              height: 55,
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#989898",
                fontFamily: "Lexend_400Regular",
                fontSize: 16,
              }}
            >
              Audio
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="navigate-next" size={26} color="#989898" />
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 10,
            height: 111,
            width: "80%",
            backgroundColor: "#292929",
            borderRadius: 15,
            alignItems: "center",
          }}
        >
          {user ? (
            <>
              <TouchableOpacity
                style={{
                  width: "100%",
                  paddingRight: 8,
                  paddingLeft: 23,
                  height: 54,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#989898",
                    fontFamily: "Lexend_400Regular",
                    fontSize: 16,
                  }}
                >
                  Mail
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Lexend_600SemiBold",
                      fontSize: 16,
                      marginRight: 5,
                    }}
                  >
                    {user.email && user.email.length > 20
                      ? user.email.substring(0, 20) + "..."
                      : user.email}
                  </Text>
                  <MaterialIcons
                    name="navigate-next"
                    size={26}
                    color="#989898"
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{ height: 1, width: "100%", backgroundColor: "black" }}
              />

              <TouchableOpacity
                style={{
                  width: "100%",
                  paddingRight: 8,
                  paddingLeft: 23,
                  height: 54,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#989898",
                    fontFamily: "Lexend_400Regular",
                    fontSize: 16,
                  }}
                >
                  Mot de passe
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>

                  <MaterialIcons
                    name="navigate-next"
                    size={26}
                    color="#989898"
                  />
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={{ color: "white" }}>
              Chargement des données utilisateur...
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#6A29FF",
            width: "80%",
            height: 55,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Lexend_600SemiBold",
              fontSize: 18,
            }}
          >
            Activer le Pass Premium
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignOut}
          style={{
            backgroundColor: "black",
            width: "80%",
            height: 54,
            borderRadius: 10,
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "white",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Lexend_400Regular",
              fontSize: 18,
            }}
          >
            Se déconnecter
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <LinearGradient
        colors={[
          "rgba(0,0,0,0)",
          "rgba(0,0,0,0.8)",
          "rgba(0,0,0,0.9)",
          "black",
        ]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 110,
          zIndex: 2,
        }}
      />
    </SafeAreaView>
  );
};

export default ProfilScreen;
