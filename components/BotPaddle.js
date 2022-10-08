import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const BotPaddle = ({yPosition}) => {//Paddle Bot
  return (
    <View
      style={{
        backgroundColor: "white",
        width: 8,
        height: 80,
        transform: [{ translateX: 600 }, { translateY: yPosition }],
      }}
    ></View>
  );
};

export default BotPaddle;
