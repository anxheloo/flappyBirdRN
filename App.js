import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import restart from "./entities";
import Physics from "./physics";
import { useEffect, useState } from "react";

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);

  useEffect(() => {
    setRunning(true);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 40,
          fontWeight: "bold",
          margin: 20,
        }}
      >
        {currentPoints}
      </Text>

      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        systems={[Physics]}
        entities={restart()}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case "game_over":
              setRunning(false);
              gameEngine.stop();
              break;
            case "new_point":
              setCurrentPoints(currentPoints + 1);
              break;
          }
        }}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <StatusBar style="auto" hidden />
      </GameEngine>

      {!running ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            onPress={() => {
              setCurrentPoints(0);
              setRunning(true);
              gameEngine.swap(restart());
            }}
            style={{
              backgroundColor: "black",
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>
              START GAME
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}
