import {SafeAreaView, Text, View } from 'react-native'
import React from 'react'

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
import { useRoute } from '@react-navigation/native';
  



export default function ChatMatchScreen() {

    const route = useRoute()
    const {userId} = route.params
    const {candidate} = route.params

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
    <SafeAreaView style={{flex:1, backgroundColor:"black"}}>
      <Text style={{color:"white"}}>{candidate.username}</Text>
      <Text style={{color:"white"}}>{userId}</Text>
      <Text style={{color:"white"}}>{candidate.id}</Text>
      
    </SafeAreaView>
  )
}

