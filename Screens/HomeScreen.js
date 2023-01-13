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
  const { promptResponse, setPromptResponse } = React.useContext(AppContext);
  const [messages, setMessages] = React.useState([]);
  const [userInput, setUserInput] = React.useState("");

  // const [ai, setAi] = React.useState(promptResponse);
  // const [user, setUser] = React.useState(prompt);

  const handleSubmit = async () => {
    const response = await fetch("http://10.0.40.41:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt: userInput
      })
    });

    if (response.ok) {
      const data = await response.json();
      const parsedData = data.bot.trim();
      console.log(parsedData);
      setMessages([
        ...messages,
        { text: userInput, isUser: true },
        { text: parsedData, isUser: false }
      ]);
      setUserInput("");
    } else {
      console.log("Something went wrong");
    }
  };

  return (
    <View style={styles.outline}>
      <View style={{ flex: 1 }}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={message.isUser ? styles.userCard : styles.botCard}
          >
            <Text>{message.text}</Text>
          </View>
        ))}
      </View>
      <View style={styles.grid}>
        <TextInput
          name="prompt"
          placeholder="Ask me anything..."
          value={userInput}
          onChangeText={(text) => setUserInput(text)}
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
  btn: {},
  botCard: {
    backgroundColor: "red",
    padding: 10,
    width: 300,
    borderRadius: 10
  },
  userCard: {
    backgroundColor: "blue",
    padding: 10,
    width: 300,
    borderRadius: 10
  }
});
