/**
 * @abstract Our home app screen
 */

import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../colors";
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
        <View style={{ alignItems: "center" }}>
          <Image style={styles.image} source={gpclose} />
          <Text style={styles.headerHelloUser}>Hello {userName}.</Text>
        </View>
        <View style={styles.chatButton}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Chat")}
            style={styles.chatButton}
          >
            <Entypo name="chat" size={50} color={colors.black} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Map")}
            style={styles.chatButton}
          >
            {/* <Text style={styles.routerHomePage}> Map</Text> */}
            <Entypo name="location" size={50} color={colors.black} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.chatButton}>
            {/* <Text style={styles.routerHomePage}> Logout</Text> */}
            <Entypo name="log-out" size={50} color={colors.black} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "#ffff",
  },
  headerHelloUser: {
    marginTop: 100,
    justifyContent: "center",
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
  chatButton: {
    height: 50,
    width: 50,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 150,
    marginLeft: 45,
    // borderRadius: 25,
    // alignItems: "left",
    // justifyContent: "left",
    // shadowColor: colors.primary,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.9,
    // shadowRadius: 8,
  },
});
