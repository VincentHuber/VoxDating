import {
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {useDispatch} from 'react-redux'
import {audioPause} from "../../reducers/pause";

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

import { Dimensions } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function LikesScreen() {

  //Communique avec le store
  const dispatch = useDispatch()

  //Calcul la taille de la police par rapport à sa View parente
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = useWindowDimensions().height;

  const elementWidth = windowWidth * 0.31; 
  const centerPosition = (windowWidth - elementWidth) / 2 - 13;

  const smallScreen = 700;
  let paddingBottomFactor;

  if (windowHeight < smallScreen) {
    paddingBottomFactor = 0.3;
  } else {
    paddingBottomFactor = 0.18;
  }

  const paddingBottom = windowHeight * paddingBottomFactor;


  //Met le son en pause 
  useEffect(()=>{
    dispatch(audioPause(true))
  },[])


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
          alignItems: "center",
          paddingBottom: paddingBottom,
        }}
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        <Text
          style={{
            width: "80%",
            marginTop: 20,

            textAlign: "center",
            fontFamily: "Lexend_900Black",
            fontSize: 34,
            color: "white",
          }}
        >
          DÉCOUVRE QUI T'AS LIKÉ
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
          Active le Pass Premium et accède à la liste complète de toutes les
          personnes qui t'ont liké.
        </Text>

        <View
          style={{
            marginTop: 40,
            height: 200,
            width: "90%",
            alignItem: "center",
            zIndex: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              zIndex: 2,
            }}
          >
            <TouchableOpacity
              style={{
                width: "31%",
                height: "100%",
                backgroundColor: "#292929",
                borderRadius: "15",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{}}></View>

              <View>
                <Text
                  style={{
                    fontFamily: "Lexend_500Medium",
                    fontSize: 48,
                    color: "white",
                    marginBottom: -5,
                    textAlign: "center",
                  }}
                >
                  12
                </Text>

                <Text
                  style={{
                    fontFamily: "Lexend_700Bold",
                    fontSize: 25,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  mois
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "Lexend_400Regular",
                    fontSize: 21,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  42,99€
                </Text>

                <Text
                  style={{
                    fontFamily: "Lexend_600SemiBold",
                    fontSize: 14,
                    color: "white",
                    marginBottom: 14,
                    textAlign: "center",
                    marginBottom: 12,
                  }}
                >
                  3,58€/mois
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                position: "absolute",
                width: "31%",
                height: 30,
                borderRadius: 20,
                backgroundColor: "black",
                borderWidth: 1,
                borderColor: "white",
                left: centerPosition,
                top: -15,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: "Lexend_500Medium",
                  color: "white",
                  fontSize: 14,
                }}
              >
                POPULAIRE
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: "31%",
                height: "100%",
                backgroundColor: "white",
                borderRadius: "15",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View></View>

              <View>
                <Text
                  style={{
                    fontFamily: "Lexend_500Medium",
                    fontSize: 48,
                    color: "black",
                    marginBottom: -5,
                    textAlign: "center",
                  }}
                >
                  6
                </Text>

                <Text
                  style={{
                    fontFamily: "Lexend_700Bold",
                    fontSize: 25,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  mois
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "Lexend_400Regular",
                    fontSize: 21,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  36,99€
                </Text>

                <Text
                  style={{
                    fontFamily: "Lexend_600SemiBold",
                    fontSize: 14,
                    color: "black",
                    marginBottom: 12,
                    textAlign: "center",
                  }}
                >
                  6,16€/mois
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: "31%",
                height: "100%",
                backgroundColor: "#292929",
                borderRadius: 15,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View></View>

              <View>
                <Text
                  style={{
                    fontFamily: "Lexend_500Medium",
                    fontSize: 48,
                    color: "white",
                    marginBottom: -5,
                    textAlign: "center",
                  }}
                >
                  1
                </Text>

                <Text
                  style={{
                    fontFamily: "Lexend_700Bold",
                    fontSize: 25,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  mois
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "Lexend_400Regular",
                    fontSize: 21,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  15,99€
                </Text>

                <Text
                  style={{
                    fontFamily: "Lexend_600SemiBold",
                    fontSize: 14,
                    color: "white",
                    marginBottom: 12,
                    textAlign: "center",
                  }}
                >
                  15,99€/mois
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: 20,
            paddingTop: 10,
            alignItems: "center",
            borderColor: "white",
            borderRadius: 15,
            width: "90%",
            height: 230,
            zIndex: 0,
          }}
        >
          <View
            style={{
              height: 40,
              width: "85%",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Entypo name="check" size={24} color="white" />
            <Text
              style={{
                color: "white",
                marginLeft: 20,
                fontFamily: "Lexend_600SemiBold",
                fontSize: 16,
              }}
            >
              Likes illimités
            </Text>
          </View>
          <View
            style={{
              height: 40,
              width: "85%",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Entypo name="check" size={24} color="white" />
            <Text
              style={{
                color: "white",
                marginLeft: 20,
                fontFamily: "Lexend_600SemiBold",
                fontSize: 16,
              }}
            >
              Découvre qui t'as liké
            </Text>
          </View>

          <View
            style={{
              height: 60,
              width: "85%",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Entypo name="check" size={24} color="white" />
            <Text
              style={{
                color: "white",
                marginLeft: 20,
                fontFamily: "Lexend_600SemiBold",
                fontSize: 16,
                flexShrink: 1,
              }}
            >
              Match avec des gens du monde entier
            </Text>
          </View>

          <View
            style={{
              height: 60,
              width: "85%",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Entypo name="check" size={24} color="white" />
            <Text
              style={{
                flexShrink: 1,
                color: "white",
                marginLeft: 20,
                fontFamily: "Lexend_600SemiBold",
                fontSize: 16,
              }}
            >
              Contrôle qui peut voir ton profil
            </Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={{
          width: "80%",
          position: "absolute",
          height: 55,
          bottom: 135,
          borderRadius: 14,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#6A29FF",
          zIndex: 3,
        }}
      >
        <Text
          style={{
            fontFamily: "Lexend_600SemiBold",
            fontSize: 18,
            color:"white"
          }}
        >
          CONTINUER
        </Text>
      </TouchableOpacity>

      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.7)", "black"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 200,
          zIndex: 2,
        }}
      />
    </SafeAreaView>
  );
}
