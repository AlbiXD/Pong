import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gyroscope } from "expo-sensors";


const PlayerPaddle = ({yPosition}) => {//Paddle
  return (
    <View
      style={{
        backgroundColor: "white",
        width: 8,
        height: 80,
        transform: [{ translateY: yPosition }],
      }}
    ></View>
  );
};

export default PlayerPaddle;


//Paddle is 80px heigh and 8px width


//x = -18