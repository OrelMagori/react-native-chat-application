import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Text, View, Image, ActivityIndicator } from "react-native";

import { Signout } from "../components/Signout";
import { styles } from "../pagesStyle/Home.style";
import { auth, database } from "../config/firebase";

const Home = () => {
  const [userName, setuserName] = useState("");
  const [userList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const gpclose = require("../assets/gpclose.png");

  useEffect(() => {
    const getAllUsers = async () => {
      const usersCollectionRef = collection(database, "users");
      const data = await getDocs(usersCollectionRef);
      setUsersList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      const getUser = userList.find((x) => x?.uid === auth.currentUser?.uid);
      if (getUser) setuserName(getUser.firstName);
      setIsLoading(false);
    };
    getAllUsers();
  }, [userList]);

  return (
    <>
      {!isLoading && userName ? (
        <View style={styles.container}>
          <Signout />
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
