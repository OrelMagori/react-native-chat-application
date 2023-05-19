import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { auth, database } from "../config/firebase";
import { Entypo } from "@expo/vector-icons";
import colors from "../colors";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
const gpclose = require("../assets/gpclose.png");

const Home = () => {
  const navigation = useNavigation();

  const [userName, setuserName] = useState("");
  const [userList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () =>
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful");
      })
      .catch((error) => {
        Alert.alert("Error in Home", error.message);
      });

  useEffect(() => {
    const getAllUsers = async () => {
      const usersCollectionRef = collection(database, "users");
      const data = await getDocs(usersCollectionRef);
      setUsersList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const getUser = userList.find((x) => x.uid === auth.currentUser.uid);
      if (getUser) setuserName(getUser.firstName);
      setIsLoading(false);
    };
    getAllUsers();
  }, [userList]);

  return (
    <>
      {!isLoading && userName ? (
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <Image style={styles.image} source={gpclose} />
            <Text style={styles.headerHelloUser}>Hello {userName}.</Text>
          </View>
        </View>
      ) : (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  headerHelloUser: {
    marginTop: 100,
    justifyContent: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
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
    marginTop: 120,
    marginLeft: 45,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
