import React from "react";
import { Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import colors from "./colors";
import Map from "./pages/Map";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

// the function is the navigation for the app
const Tab = createBottomTabNavigator();
function ChatStack() {
  return (
    <Tab.Navigator
      defaultScreenOptions={Home}
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}
    >
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

export default ChatStack;
