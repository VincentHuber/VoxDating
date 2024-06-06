import {Text, View, SafeAreaView } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import {useDispatch} from 'react-redux'
import {audioPause} from "../../reducers/pause";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';


const ChatScreen = () => {

  const dispatch = useDispatch()

  const idRef = useRef(null)

  const [likedCandidates, setLikedCandidates]=useState([])

   //Valeur de l'id
   const [id, setId] = useState(null);

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


   useEffect(()=>{
    if(id !== null){
      idRef.current = id
    }
   },[id])
 

  // Fonction pour désactiver l'audio de candidate
  useEffect(()=>{
    dispatch(audioPause(true))
  },[])

// Effet pour retrouver les id des likes du user
useEffect(() => {
  const fetchUserData = async () => {
    if (idRef.current) {
      const userDocRef = doc(db, "users", idRef.current);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // Récupère tous les likes du user
        const userLikedId = userDoc.data().like || [];

        if (userLikedId.length === 0) {
          console.log("Aucun like trouvé pour cet utilisateur.");
        }

        // Récupère tous les profils des personnes likées par l'user
        const candidateLikedIdPromises = userLikedId.map((idLiked) =>
          getDoc(doc(db, "users", idLiked))
        );

        const candidateLikedDocs = await Promise.all(candidateLikedIdPromises);

        const mutualLikes = candidateLikedDocs
          .filter(doc => {
            if (doc.exists()) {
              const candidateData = doc.data();

              if (candidateData.like && Array.isArray(candidateData.like)) {
                return candidateData.like.includes(idRef.current);
              } else {
                console.log("Le champ 'like' n'existe pas ou n'est pas un tableau dans le document du candidat:", doc.id);
                return false;
              }
            } else {
              console.log("Le document du candidat n'existe pas :", doc.id);
              return false;
            }
          })
          .map(doc => doc.data());

        setLikedCandidates(mutualLikes);
        console.log("Candidats likés mutuels :", mutualLikes);
      } else {
        console.log("Le document utilisateur n'existe pas");
      }
    } else {
      console.log("idRef.current n'est pas défini");
    }
  };

  fetchUserData();
}, [id]);


  return (
    <SafeAreaView style={{flex:1, backgroundColor:'black'}}>
      <Text style={{color:"white"}}>ChatScreen</Text>

      {likedCandidates.length > 0 ? (
        likedCandidates.map((candidate, index)=> (
          <TouchableOpacity key={index }>
            <Text style={{color:"white"}}>{candidate.username}</Text>
          </TouchableOpacity>)
        )
      ):(
        <Text style={{color:"white"}}>Aucun match pour le moment</Text>
      )}
    </SafeAreaView>
  )
}

export default ChatScreen

