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
  ScrollView,
} from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { SelectList } from "react-native-dropdown-select-list";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../config/firebase";
import { ages } from "../ages";

const gpclose = require("../assets/gpclose.png");

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selected, setSelected] = React.useState("");
  const [users] = useState([]);

  const handleSignup = () => {
    if (
      email !== "" &&
      password !== "" &&
      firstName !== "" &&
      lastName !== "" &&
      selected !== ""
    ) {
      console.log(users);
      if (selected < "18")
        Alert.alert("Error in Signup", "You must be over 18 years old");
      else {
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (userCredential) => {
            const user = userCredential.user;
            const randomNumber = Math.floor(Math.random() * 1000) + 1;
            const urlAvatur = `https://i.pravatar.cc/${randomNumber}`;
            await addDoc(collection(database, "users"), {
              uid: user.uid,
              email,
              firstName,
              lastName,
              age: selected,
              urlAvatur,
            });
            console.log("Signup successfully!");
          })
          .catch((err) => Alert.alert("Error in Signup", err.message));
      }
    } else {
      Alert.alert("Error in Signup", "The fields must be filled");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView style={styles.scrollView}> */}
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
          <TextInput
            style={styles.input}
            placeholder="First name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
          <SelectList
            placeholder="Select your age"
            setSelected={(val) => setSelected(val)}
            data={ages}
            save="value"
            // search={false}
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
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "darkblue",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    height: 58,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
    borderStartWidth: 1,
    borderColor: "gray",
    backgroundColor: "#ffff",
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
  scrollView: {
    marginHorizontal: 20,
  },
});
