import {Text, View, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import LiveAudioStream, {
  PowerLevel,
  NativeRecordReceivePCM,
  FrequencyHistogramView,
} from 'react-native-live-audio-fft';
import {useDispatch} from 'react-redux'
import {audioPause} from "../../reducers/pause";



const ChatScreen = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(audioPause(true))
  },[])

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'black'}}>
      <Text style={{color:"white"}}>ChatScreen</Text>
    </SafeAreaView>
  )
}

export default ChatScreen

