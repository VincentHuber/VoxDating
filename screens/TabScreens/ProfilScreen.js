import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../firebase";

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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      <Text style={{ color: "white" }}>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={{
          backgroundColor: "white",
          width: "60%",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <Text
          style={{
            color: "black",
            fontWeight: "700",
            fontSize: 16,
          }}
        >
          Se déconnecter
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfilScreen;


