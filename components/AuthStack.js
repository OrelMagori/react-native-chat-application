import React, { useState, useEffect } from "react";
import { Entypo } from "@expo/vector-icons";
import { Keyboard, KeyboardAvoidingView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import colors from "./colors";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// the function is the navigation for the login and signup pages
const Tab = createBottomTabNavigator();
function AuthStack() {
  const [keyboardShown, setKeyboardShown] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardShown(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardShown(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBarOptions={{
          keyboardHidesTabBar: true,
          style: {
            position: keyboardShown ? "absolute" : "relative",
            bottom: keyboardShown ? 0 : null,
          },
        }}
      >
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarLabel: "Login",
            tabBarIcon: () => (
              <Entypo name="login" size={25} color={colors.black} />
            ),
          }}
        />
        <Tab.Screen
          name="Signup"
          component={Signup}
          options={{
            tabBarLabel: "Signup",
            tabBarIcon: () => (
              <Entypo name="add-user" size={25} color={colors.black} />
            ),
          }}
        />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
}

export default AuthStack;
