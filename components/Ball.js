import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import PlayerPaddle from "./PlayerPaddle";

const Ball = ({yPositionBall, xPositionBall}) => {//Gets the paddle position
  return (
    <View
      style={{
        backgroundColor: "red",
        width: 10,
        height: 10,
        transform: [{ translateX: xPositionBall }, { translateY: yPositionBall }, { rotate: "180deg" }],
      }}
    >
    </View>
  );
};

export default Ball;
