import { useNavigation } from "@react-navigation/core";
import React from "react";
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

  const navigation = useNavigation();

  const windowHeight = useWindowDimensions().height;

  const smallScreen = 700;
  let paddingBottomFactor;

  if (windowHeight < smallScreen) {
    paddingBottomFactor = 0.22;
  } else {
    paddingBottomFactor = 0.13;
  }

  const paddingBottom = windowHeight * paddingBottomFactor;


  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
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
        alignItems: "center",}}
      style={{ 
        flex: 1,
        width: "100%",

        }}>
        <Text
          style={{
            fontFamily: "Lexend_900Black",
            fontSize: 34,
            color: "white",
            marginTop:10,
          }}
        >
          PROFIL
        </Text>

        {/* <Text style={{fontFamily:"Lexend_400Regular", color: "white" }}>Email: {auth.currentUser?.email}</Text> */}

        <View
          style={{
            marginTop: 40,
            height: 277,
            width: "80%",
            backgroundColor: "#292929",
            borderRadius: 15,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: 54,
              paddingRight:8,
              paddingLeft:23,
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
                Jean
              </Text>
              <MaterialIcons name="navigate-next" size={26} color="#989898" />
            </View>
          </TouchableOpacity>

          <View style={{height:1, width:"100%", backgroundColor:"black"}} />

          <TouchableOpacity
            style={{
              width: "100%",
              height: 54,
              paddingRight:8,
              paddingLeft:23,
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
                45
              </Text>
              <MaterialIcons name="navigate-next" size={26} color="#989898" />
            </View>
          </TouchableOpacity>

          <View style={{height:1, width:"100%", backgroundColor:"black"}} />

          <TouchableOpacity
            style={{
              width: "100%",
              height: 54,
              paddingRight:8,
              paddingLeft:23,
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
                14 av...
              </Text>
              <MaterialIcons name="navigate-next" size={26} color="#989898" />
            </View>
          </TouchableOpacity>

          <View style={{height:1, width:"100%", backgroundColor:"black"}} />

          <TouchableOpacity
            style={{
              width: "100%",
              paddingRight:8,
              paddingLeft:23,
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
                Homme
              </Text>
              <MaterialIcons name="navigate-next" size={26} color="#989898" />
            </View>
          </TouchableOpacity>

          <View style={{height:1, width:"100%", backgroundColor:"black"}} />

          <TouchableOpacity
            style={{
              width: "100%",
              paddingRight:8,
              paddingLeft:23,
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
                Femme
              </Text>
              <MaterialIcons name="navigate-next" size={26} color="#989898" />
            </View>
          </TouchableOpacity>
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
          <TouchableOpacity
            style={{
              width: "100%",
              paddingRight:8,
              paddingLeft:23,
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
                jean@live.fr
              </Text>
              <MaterialIcons name="navigate-next" size={26} color="#989898" />
            </View>
          </TouchableOpacity>

          <View style={{height:1, width:"100%", backgroundColor:"black"}} />

          <TouchableOpacity
            style={{
              width: "100%",
              paddingRight:8,
              paddingLeft:23,
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
              <Text
                style={{
                  color: "white",
                  fontFamily: "Lexend_600SemiBold",
                  fontSize: 16,
                  marginRight: 5,
                }}
              >
                *******
              </Text>
              <MaterialIcons name="navigate-next" size={26} color="#989898" />
            </View>
          </TouchableOpacity>

               
        </View>
        

        <TouchableOpacity
          style={{
            backgroundColor: "white",
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
              color: "black",
              fontFamily: "Lexend_400Regular",
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
            borderWidth:1,
            borderColor:"white",
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
