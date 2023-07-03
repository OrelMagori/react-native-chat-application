import React, { useLayoutEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../colors";

export const Signout = () => {
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}
        >
          <Entypo
            name="log-out"
            size={24}
            color={colors.black}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
};
