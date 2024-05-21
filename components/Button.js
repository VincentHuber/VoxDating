import { TouchableWithoutFeedback, Animated } from "react-native";
import React, { useCallback, useRef } from "react";
import { FontAwesome } from "@expo/vector-icons";

const Button = ({ name, size, style, onPress }) => {

  // Crée une référence mutable pour une valeur animée initialisée à 1
  const scale = useRef(new Animated.Value(1)).current;

  const animateScale = useCallback( 
    (newValue) => {
      Animated.spring(scale, {  // Utilise Animated.spring pour animer la valeur scale
        toValue: newValue, 
        friction: 10,
        useNativeDriver: true,
      }).start();
    },
    [scale]
  );

  return (
    <TouchableWithoutFeedback
      // Réduit la taille du bouton quand on presse
      onPressIn={() => animateScale(0.8)} 
      onPressOut={() => {
        // Restaure la taille du bouton
        animateScale(1), 
        onPress();
      }}
      delayPressIn={0}
      delayPressOut={20}
    >
      <Animated.View
        style={{
          height: 60,
          width: 60,
          gap:10,
          backgroundColor: "white",
          borderRadius: 40,
          justifyContent: "center",
          alignItems: "center",
          // Applique la transformation d'échelle animée
          transform: [{ scale }],
          // Étend tout autre style passé via la prop style
          ...style,
        }}
      >
        <FontAwesome name={name} size={size} color="black" />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Button;
