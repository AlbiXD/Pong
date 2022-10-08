// Author: Albi Zhaku
// 
// 
// Description: Pong but this is a failed attempt
// 
// 
// Bugs: App is incomplete, ball will not move
// 


//What my goal was: I had attempted to make the ball move in the beginning but that never worked, after that my goal was to work on collision, and if the ball touched the paddle I was going to make the ball rotate and then randomly go diagnally up or diagnally down, then after that my goal was to make the robot paddle wich I would have made a random math function to determine its speed and would have made it follow the ball so it mostly gets to the ball. After that My goal was to work on the goal for each side in which I would have made it if it scored that the ball would reset and positions for every sprite to return to default, and update the score for each side and update the score image. I did not have a plan for end game but I would have made the game end at whoever reaches score 3.
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import PlayerPaddle from "./components/PlayerPaddle";
import DashedLine from "react-native-dashed-line";
import BotPaddle from "./components/BotPaddle";
import Ball from "./components/Ball";
import { Gyroscope } from "expo-sensors";

export default function App() {
  const scorePlayerImage = [//Images for score
    "https://i.imgur.com/19GGI0m.png",
    "https://i.imgur.com/lH0KgbZ.png",
    "https://i.imgur.com/Bv2CSf8.png",
    "https://i.imgur.com/GvLa6o3.png",
  ];
  const scoreBotImage = [//images for score
    "https://i.imgur.com/19GGI0m.png",
    "https://i.imgur.com/lH0KgbZ.png",
    "https://i.imgur.com/Bv2CSf8.png",
    "https://i.imgur.com/GvLa6o3.png",
  ];

  const [data, setData] = useState({//Gyroscope
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener((gyroscopeData) => {
        setData(gyroscopeData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  const [yPosition, setYPosition] = useState(150);//Y position for Player Paddle

  useEffect(() => {//moving the player

    if (data.y <= -0.5 && yPosition > 0) {
      setYPosition(yPosition - 10);
    }
    if (data.y >= 0.5 && yPosition < 325) {
      setYPosition(yPosition + 10);
    }
  }, [data.y]);



  const [xBall, setX] = useState(350)//ball x
  const [yBall, setY] = useState(180)//ball y
  const [score, setScore] = useState(0);
  const [Botscore, setBotScore] = useState(0);
  const [PlayerBall, setPlayerBall] = useState(false)
  const [incrementX, setIncrementX] = useState(-2)//ball x
  const [incrementY, setIncrementY] = useState(-1)//ball x

  useEffect(() => { //Makes the ball move
    let xtempBall = xBall;
    let ytempBall = yBall;
    const interval = setInterval(() => {
      if (score != 3 || Botscore != 3) {
        console.log(xBall)
        if (xtempBall > -20) {//If not in goal
          xtempBall = xtempBall + incrementX;
          ytempBall = ytempBall + incrementY;
          setX(xtempBall);
          setY(ytempBall);
        }
        else {
          xtempBall = 350;
          ytempBall = 180;
          setScore(score + 1);
          setX(xtempBall)
          setY(ytempBall);
        }
        if(xtempBall > 725){
          xtempBall = 350;
          ytempBall = 180;
          setScore(score + 1);
          setIncrementX(-2)
          setIncrementY(-1)
          setX(xtempBall)
          setY(ytempBall);
        }
        if(xtempBall == 700 && (yPosition <= yBall && yBall <= yPosition + 80)){
          setIncrementX(-2)
          setIncrementY(-1)
          setPlayerBall(false)
          console.log("Collusion Detected")
        }
        if (xBall == 4 && (yPosition <= yBall && yBall <= yPosition + 80)) {// If collision with player paddle
          setPlayerBall(true)
          //int result = (int) (Math.random() * (max - min + 1)) - min; 
          setIncrementX(2);
          setIncrementY(1);
          console.log("Collision occured!");
        }
        if((xBall >= -72 && xBall <= 666) && yBall == 390){
          console.log("Collision Detected!")
          if(PlayerBall){
            setIncrementX(2)
            setIncrementY(-1);
          }else{
            setIncrementX(-2)
            setIncrementY(-1)
          }
        }
        if((xBall >= -72 && xBall <= 666) && yBall == 0){
          console.log("Collision Detected!")
          if(PlayerBall){
            setIncrementX(-2)
            setIncrementY(1);
          }else{
            setIncrementX(-2)
            setIncrementY(1)
          }
        }
      }
    }, 10);
    return () => clearInterval(interval);
  }, [xBall, yBall]);


  return (
    <View style={styles.border1}>
      <View style={styles.mainscreen}>
        <View style={styles.playerGoal}></View>
        <PlayerPaddle
          yPosition={yPosition} />

        <Ball
          yPositionBall={yBall}
          xPositionBall={xBall} />
        <Image
          style={styles.tinyLogo}
          source={{
            uri: scorePlayerImage[score],
          }}
        />
        <Image
          style={styles.tinyLogo1}
          source={{
            uri: scoreBotImage[Botscore],
          }}
        />
        <BotPaddle
        yPosition = {yPosition}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainscreen: {
    width: 750,
    height: 400,
    backgroundColor: "black",
    flexDirection: "row",
  },
  playerGoal: {
    flex: 0.02,
    backgroundColor: "black",
  },
  botGoal: {
    flex: 0.02,
    transform: [{ translateX: 665 }],
    backgroundColor: "black",
  },
  border1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "grey",
  },

  tinyLogo: {
    transform: [{ translateX: 200 }, { translateY: 30 }],
    width: 50,
    height: 50,
  },
  tinyLogo1: {
    transform: [{ translateX: 375 }, { translateY: 30 }],
    width: 50,
    height: 50,
  },
});
