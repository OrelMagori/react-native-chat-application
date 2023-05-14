import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const gpclose = require("../assets/gpclose.png");

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (email !== "" && password !== "") {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Signup successfully!"))
        .catch((err) => Alert.alert("Error in Signup", err.message));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.whiteSheet} />
      {/* <Image style={styles.backImage} source={gpclose} /> */}
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            Sign Up
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
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text
              style={{ color: "darkblue", fontWeight: "600", fontSize: 14 }}
            >
              {" "}
              Login
            </Text>
          </TouchableOpacity>
          <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
            Already have account?
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

  backImage: {
    alignSelf: "center",
    width: 230,
    height: 100,
    marginTop: 70,
  },
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