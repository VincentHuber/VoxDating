import { View } from "react-native";
import React from "react";
import Button from "./Button";

const COLORS = {
  like: "#00eda6",
  nope: "#ff006f",
  star: "#07A6FF",
};

const Footer = ({ handleChoice }) => {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 150,
        width: 250,
        gap:20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        name="times"
        size={24}
        color={COLORS.nope}
        onPress={() => handleChoice(-1)}
      />
      <Button
        name="star"
        size={24}
        color={COLORS.star}
      />
      <Button
        name="heart"
        size={24}
        color={COLORS.like}
        onPress={() => handleChoice(1)}
      />
    </View>
  );
};

export default Footer;
