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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const HomeScreen = () => {
  const { promptResponse, setPromptResponse } = React.useContext(AppContext);
  const [messages, setMessages] = React.useState([]);
  const [userInput, setUserInput] = React.useState("");
  const [botText, setBotText] = React.useState("");
  const [isWriting, setIsWriting] = React.useState(false);

  // const [ai, setAi] = React.useState(promptResponse);
  // const [user, setUser] = React.useState(prompt);

  const typeText = (text) => {
    let i = 0;
    setIsWriting(true);
    const interval = setInterval(() => {
      setBotText((prev) => prev + text[i]);
      i++;
      if (i === text.length) {
        setIsWriting(false);
        clearInterval(interval);
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
    } else {
      console.log("Something went wrong");
    }
  };

  return (
    <View style={styles.outline}>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {messages.map((message, index) => (
            <View
              key={index}
              style={message.isUser ? styles.userCard : styles.botCard}
            >
              <Image
                source={
                  message.isUser
                    ? require("../assets/u.jpg")
                    : require("../assets/b.jpg")
                }
                style={styles.image}
              />
              <Text style={styles.text}>{message.text}</Text>
            </View>
          ))}
        </ScrollView>
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
    padding: 10,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  userCard: {
    backgroundColor: "#4b6584",
    padding: 10,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontWeight: "500",
    paddingHorizontal: 10
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50
  }
});
