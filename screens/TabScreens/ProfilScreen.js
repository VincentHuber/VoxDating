import { useNavigation } from "@react-navigation/core";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebase";
import { MaterialIcons } from '@expo/vector-icons';

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
      <Text
        style={{ fontFamily: "Lexend_900Black", fontSize: 34, color: "white" }}
      >
        PROFIL
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
        Tu pourras mettre ta localisation à jour dans ton profil.
      </Text>
      {/* <Text style={{fontFamily:"Lexend_400Regular", color: "white" }}>Email: {auth.currentUser?.email}</Text> */}

      <View
        style={{
          marginTop: 40,
          height: 280,
          width: "80%",
          backgroundColor: "#292929",
          borderRadius: 15,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: "85%",
            height: 55,
            borderColor: "white",
            borderBottomWidth: 0.5,
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
          <View style={{flexDirection:"row", alignItems:"center"}}>
          <Text
            style={{
              color: "white",
              fontFamily: "Lexend_600SemiBold",
              fontSize: 16,
              marginRight:5
            }}
          >
            JEAN
          </Text>
          <MaterialIcons name="navigate-next" size={26} color="#989898" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: "85%",
            height: 55,
            borderColor: "white",
            borderBottomWidth: 0.5,
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
          <View style={{flexDirection:"row", alignItems:"center"}}>
          <Text
            style={{
              color: "white",
              fontFamily: "Lexend_600SemiBold",
              fontSize: 16,
              marginRight:5
            }}
          >
            45
          </Text>
          <MaterialIcons name="navigate-next" size={26} color="#989898" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: "85%",
            height: 55,
            borderColor: "white",
            borderBottomWidth: 0.5,
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
          <View style={{flexDirection:"row", alignItems:"center"}}>
          <Text
            style={{
              color: "white",
              fontFamily: "Lexend_600SemiBold",
              fontSize: 16,
              marginRight:5
            }}
          >
            14 AV...
          </Text>
          <MaterialIcons name="navigate-next" size={26} color="#989898" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: "85%",
            height: 55,
            borderColor: "white",
            borderBottomWidth: 0.5,
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
          <View style={{flexDirection:"row", alignItems:"center"}}>
          <Text
            style={{
              color: "white",
              fontFamily: "Lexend_600SemiBold",
              fontSize: 16,
              marginRight:5
            }}
          >
            HOMME
          </Text>
          <MaterialIcons name="navigate-next" size={26} color="#989898" />
          </View>
        </TouchableOpacity>

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
            Genre souhaité
          </Text>
          <View style={{flexDirection:"row", alignItems:"center"}}>
          <Text
            style={{
              color: "white",
              fontFamily: "Lexend_600SemiBold",
              fontSize: 16,
              marginRight:5
            }}
          >
            FEMME
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
          justifyContent:"center"
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
          <View style={{flexDirection:"row", alignItems:"center"}}>
        
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
          justifyContent:"center"
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
          <View style={{flexDirection:"row", alignItems:"center"}}>
        
          <MaterialIcons name="navigate-next" size={26} color="#989898" />
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleSignOut}
        style={{
          backgroundColor: "white",
          width: "80%",
          height: 55,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <Text
          style={{
            color: "black",
            fontFamily: "Lexend_400Regular",
            fontSize: 18,
          }}
        >
          Se déconnecter
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default ProfilScreen;
