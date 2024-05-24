import {
  TouchableOpacity,
  Text,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import React from "react";
import { BlurView } from "expo-blur";
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

import { Dimensions } from 'react-native';


export default function LikesScreen() {

  const windowWidth = Dimensions.get('window').width;

  const elementWidth = windowWidth * 0.31; // Largeur de l'élément
  const centerPosition = (windowWidth - elementWidth) / 2 -13; 

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
      <Text
        style={{
          width: "80%",
          marginTop: 25,

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
          marginTop: 20,

          textAlign: "center",
          fontFamily: "Lexend_400Regular",
          fontSize: 18,
          color: "white",
        }}
      >
        Active le Passe Premium et accède à la liste complète de toutes les
        personnes qui t'ont liké.
      </Text>
      <View style={{
        marginTop: 40,
        height:"45%", 
        width:"90%", 
        alignItem:"center", 
        borderColor:"red", 
        borderWidth:1 
        }}>
      <View
        style={{
          height: "70%",
          width: "100%",
          
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
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2
          }}
        >
          <Text style={{
            fontFamily: "Lexend_500Medium", 
            color:"white", 
            fontSize: 14
            }}>
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

      <TouchableOpacity
        style={{
          width: "100%",
          marginTop: 12,
          height: 55,
          borderRadius: 14,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            fontFamily: "Lexend_400Regular",
            fontSize: 18,
          }}
        >
          CONTINUER
        </Text>
      </TouchableOpacity>
</View>
      {/* <View
        style={{
          width: "80%",
          justifyContent: "space-around",
          paddingTop: 40,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <View style={{ marginBottom: 25 }}>
          <TouchableOpacity
            style={{
              width: 120,
              height: 120,
              borderColor: "white",
              borderRadius: 100,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              width={120}
              height={150}
              source={require("../../assets/audio.png")}
              style={{ width: "41%", height: "50%" }}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,

              textAlign: "center",
              fontFamily: "Lexend_400Regular",
              fontSize: 18,
              color: "white",
            }}
          >
            SOPHIE
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={{
              width: 120,
              height: 120,
              borderColor: "white",
              borderRadius: 100,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              width={120}
              height={150}
              source={require("../../assets/audio.png")}
              style={{ width: "41%", height: "50%" }}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,

              textAlign: "center",
              fontFamily: "Lexend_400Regular",
              fontSize: 18,
              color: "white",
            }}
          >
            MARIE
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={{
              width: 120,
              height: 120,
              borderColor: "white",
              borderRadius: 100,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              width={120}
              height={150}
              source={require("../../assets/audio.png")}
              style={{ width: "41%", height: "50%" }}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,

              textAlign: "center",
              fontFamily: "Lexend_400Regular",
              fontSize: 18,
              color: "white",
            }}
          >
            ALEXANDRA
          </Text>
        </View>

        <View style={{ marginBottom: 25 }}>
          <TouchableOpacity
            style={{
              width: 120,
              height: 120,
              borderColor: "white",
              borderRadius: 100,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              width={120}
              height={150}
              source={require("../../assets/audio.png")}
              style={{ width: "41%", height: "50%" }}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,

              textAlign: "center",
              fontFamily: "Lexend_400Regular",
              fontSize: 18,
              color: "white",
            }}
          >
            JULIE
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={{
              width: 120,
              height: 120,
              borderColor: "white",
              borderRadius: 100,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              width={120}
              height={150}
              source={require("../../assets/audio.png")}
              style={{ width: "41%", height: "50%" }}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,

              textAlign: "center",
              fontFamily: "Lexend_400Regular",
              fontSize: 18,
              color: "white",
            }}
          >
            LOUISE
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={{
              width: 120,
              height: 120,
              borderColor: "white",
              borderRadius: 100,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              width={120}
              height={150}
              source={require("../../assets/audio.png")}
              style={{ width: "41%", height: "50%" }}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,

              textAlign: "center",
              fontFamily: "Lexend_400Regular",
              fontSize: 18,
              color: "white",
            }}
          >
            VICTOIRE
          </Text>
        </View>

        <BlurView
          intensity={15}
          tint="dark"
          style={{ 
            position: "absolute", 
            top: 0, 
            bottom: 0, 
            left: 0, 
            right: 0, 
            zIndex:1
          }}
        />
      </View> */}
    </SafeAreaView>
  );
}
