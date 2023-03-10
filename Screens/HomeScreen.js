import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  ScrollView
} from "react-native";
import React from "react";
import { APP_ICON } from "../context/settings";
import { AppContext } from "../context/AppContext";
import BotMessage from "../Components/BotMessage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomeScreen = () => {
  const { promptResponse, setPromptResponse } = React.useContext(AppContext);
  const [messages, setMessages] = React.useState([]);
  const [userInput, setUserInput] = React.useState("");
  const [botText, setBotText] = React.useState("");
  const [isWriting, setIsWriting] = React.useState(false);
  const [isCurrentMessageWriting, setIsCurrentMessageWriting] =
    React.useState(false);
  const [thinking, setThinking] = React.useState(false);

  // const [ai, setAi] = React.useState(promptResponse);
  // const [user, setUser] = React.useState(prompt);

  const typeText = (text) => {
    let i = 0;
    setIsCurrentMessageWriting(true);
    setIsWriting(true);
    const interval = setInterval(() => {
      setBotText((prev) => prev + text[i]);
      i++;
      if (i === text.length) {
        setIsWriting(false);
        clearInterval(interval);
        setThinking(false);
      }
    }, 100);
  };

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
      setBotText("");
      typeText(parsedData);
      setThinking(false);
    } else {
      console.log("Something went wrong");
    }
  };

  return (
    <View style={styles.outline}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {messages.map((message, index) => (
            <View key={index}>
              {message.isUser ? (
                <View style={styles.userCard}>
                  <Image
                    source={require("../assets/u.jpg")}
                    style={styles.image}
                  />
                  <Text style={styles.text}>{message.text}</Text>
                </View>
              ) : (
                <View style={styles.botMessageContainer}>
                  <Image
                    source={require("../assets/b.jpg")}
                    style={styles.image}
                  />
                  <Text style={styles.text}>{message.text}</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
      {/* Thinking animation goes here */}
      {/* {isWriting === true && (
        <Text style={styles.thinkingText}>Thinking ... </Text>
      )} */}

      <View style={styles.grid}>
        <TextInput
          name="prompt"
          placeholder={
            thinking === true ? "Thinking ... " : "Ask me anything..."
          }
          value={userInput}
          onChangeText={(text) => setUserInput(text)}
          style={styles.textInput}
          placeholderTextColor="gray"
        />
        <TouchableWithoutFeedback
          style={styles.btn}
          onPress={() => {
            handleSubmit();
            setUserInput("");
            setThinking(true);
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
    right: 40,
    zIndex: 10,
    padding: 10,
    backgroundColor: "#34495e",
    borderRadius: 50,
    textAlign: "center"
  },
  btn: {},
  botCard: {
    padding: 10,
    marginVertical: 5,
    flexDirection: "row",
    width: windowWidth
  },
  userCard: {
    backgroundColor: "#4b6584",
    padding: 10,
    marginVertical: 5,
    flexDirection: "row",

    width: windowWidth
  },
  text: {
    color: "white",
    fontWeight: "500",
    paddingHorizontal: 10,
    width: 300
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50
  },
  botMessageContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 10
  },
  thinkingText: {
    textAlign: "center",
    fontWeight: "500",
    color: "red",
    fontSize: 18
  }
});
