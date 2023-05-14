/**
 * @abstract Our home app screen
 */

import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
const gpclose = require("../assets/gpclose.png");

const Home = () => {
  const navigation = useNavigation();

  const [userName, setuserName] = useState("");

  const auth = getAuth();
  const handleLogout = () =>
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful");
      })
      .catch((error) => {
        Alert.alert("Error in Home", error.message);
      });

  useEffect(() => {
    const email = auth.currentUser.email;
    userNameTemp = email.substring(0, email.lastIndexOf("@"));
    setuserName(userNameTemp);
  }, [navigation]);

  return (
    <>
      <View style={styles.container}>
        <Image style={styles.image} source={gpclose} />
        <Text style={styles.headerHelloUser}>Hello {userName}.</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Map")}>
          <Text style={styles.routerHomePage}> Map</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.routerHomePage}> Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
  },
  headerHelloUser: {
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  routerHomePage: {
    marginTop: 10,
    color: "darkblue",
    fontWeight: "600",
    fontSize: 24,
  },
  image: {
    alignItems: "center",
    // backgroundColor: "#ffff",
    width: 230,
    height: 100,
    marginTop: 200,
  },
});
