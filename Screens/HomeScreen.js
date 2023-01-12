import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  Dimensions
} from "react-native";
import React from "react";
import { APP_ICON } from "../context/settings";
import { AppContext } from "../context/AppContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomeScreen = () => {
  const { prompt, setPrompt, promptResponse, setPromptResponse } =
    React.useContext(AppContext);

  const handleSubmit = async () => {
    console.log(prompt);

    const response = await fetch("http://10.0.40.41:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: prompt
      })
    });

    if (response.ok) {
      const data = await response.json();
      const parsedData = data.bot.trim(); // trims any trailing spaces/'\n'
      console.log(parsedData);
      setPromptResponse(parsedData);
      //typeText(messageDiv, parsedData);
    } else {
      //const err = await response.text();
      console.log("Something went wrong");
      //alert(err);
    }
  };

  return (
    <View style={styles.outline}>
      <View style={{ flex: 1 }}>{/* chat container */}</View>
      <View style={styles.grid}>
        <TextInput
          name="prompt"
          placeholder="Ask me anything..."
          value={prompt}
          onChangeText={(text) => setPrompt(text)}
          style={styles.textInput}
        />
        <TouchableWithoutFeedback
          style={styles.btn}
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={styles.btnText}>{APP_ICON.SEND}</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  outline: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#34495e"
  },
  textInput: {
    width: windowWidth,
    backgroundColor: "#2c3e50",
    padding: 10,
    color: "#eee",
    fontWeight: "500",
    zIndex: 5
  },
  grid: {
    flexDirection: "row",
    alignItems: "center",
    width: windowWidth
  },
  btnText: {
    position: "relative",
    right: 28,
    zIndex: 10
  },
  btn: {}
});
