import React, { useState, createContext, useContext, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import colors from "./colors";
import Map from "./pages/Map";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { auth } from "./config/firebase";
// import { AuthStack } from "./components/AuthStack";
// import { ChatStack } from './components/ChatStack';

const AuthenticatedUserContext = createContext({});
const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // this return is the value of the context provider
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

const Tab = createBottomTabNavigator();
// the function is the navigation for the app
function ChatStack() {
  return (
    <Tab.Navigator
      defaultScreenOptions={Home}
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => (
            <Entypo name="home" size={25} color={colors.black} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: () => (
            <Entypo name="chat" size={25} color={colors.black} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: () => (
            <Entypo name="map" size={25} color={colors.black} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// the function is the navigation for the login and signup pages
function AuthStack() {
  const [keyboardShown, setKeyboardShown] = useState(false);

  // the useEffect is hide the tab bar when the keyboard is shown.
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
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: [
            {
              display: "flex",
            },
            null,
          ],
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

// the function is the root navigation for the app
function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  // the function is the listener for the user authentication
  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
