import {Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import LiveAudioStream, {
  PowerLevel,
  NativeRecordReceivePCM,
  FrequencyHistogramView,
} from 'react-native-live-audio-fft';



const ChatScreen = () => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'black'}}>
      <Text style={{color:"white"}}>ChatScreen</Text>
    </SafeAreaView>
  )
}

export default ChatScreen

