import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
  NativeModules,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const backgroungImage = require("../assets/backgroungImage.jpg");
const { StatusBarManager } = NativeModules;

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Loged in successfully!"))
        .catch((err) => Alert.alert("Error in login", err.message));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.whiteSheet} />
      {/* <Image style={styles.backImage} source={backgroungImage} /> */}
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          autoFocus={true}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          autoCorrect={false}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={{ fontWeight: "bold", color: "#ffff", fontSize: 18 }}>
            Log In
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row-reverse",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text
              style={{ color: "darkblue", fontWeight: "600", fontSize: 14 }}
            >
              {" "}
              Sign Up
            </Text>
          </TouchableOpacity>
          <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
            Don't have an account?
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0000",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "darkblue",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#ffff",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    borderStartWidth: 1,
  },

  // backImage: {
  //   alignSelf: "center",
  //   zIndex: -1,
  //   width: 500,
  //   height: 400,
  //   marginTop: 70,
  // },
  whiteSheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
    // paddingTop: Platform.OS === "android" ? StatusBarManager.HEIGHT : 0,
  },
  button: {
    backgroundColor: "darkblue",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
