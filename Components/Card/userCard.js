import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppContext } from "../../context/AppContext";

const userCard = () => {
  const { prompt } = React.useContext(AppContext);
  return (
    <View style={styles.outline}>
      <Text>{prompt}</Text>
    </View>
  );
};

export default userCard;

const styles = StyleSheet.create({
  outline: {
    width: 400,
    padding: 10,
    borderRadius: 10
  }
});
