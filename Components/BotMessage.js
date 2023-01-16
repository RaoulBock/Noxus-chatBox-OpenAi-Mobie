import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const BotMessage = ({ text, isWriting, isCurrentMessageWriting }) => {
  return (
    <View style={styles.botMessageContainer}>
      <Image source={require("../assets/b.jpg")} style={styles.image} />
      <Text style={styles.text}>{isWriting ? "Thinking..." : text}</Text>
    </View>
  );
};

export default BotMessage;

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    borderRadius: 50
  },
  text: {
    color: "white",
    fontWeight: "500",
    paddingHorizontal: 10,
    width: 300
  },
  botMessageContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10
  }
});
