import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { SelectList } from "react-native-dropdown-select-list";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { ages } from "../ages";
import { auth, database } from "../config/firebase";
import { styles } from "../pagesStyle/Signup.style";

export default function Signup({ navigation }) {
  const [users] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [selected, setSelected] = useState("");
  const [firstName, setFirstName] = useState("");

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
            const numberAvatar = randomNumber;
            await addDoc(collection(database, "users"), {
              uid: user?.uid,
              email,
              firstName,
              lastName,
              age: selected,
              numberAvatar,
            });
            console.log("Signup successfully!");
          })
          .catch((err) => Alert.alert("Error in Signup", err.message));
      }
    } else {
      Alert.alert("Error in Signup", "The fields must be filled");
    }
  };
  const handleSubmit = () => {
    handleSignup();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.whiteSheet} />
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
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
    </SafeAreaView>
  );
}
