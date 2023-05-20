import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../colors";

export const GoBack = () => {
  const navigation = useNavigation();

  const GoToHomePage = () => {
    navigation.navigate("Home");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={GoToHomePage}>
          <Entypo
            name="chevron-thin-left"
            size={24}
            color={colors.black}
            style={{ marginLeft: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return null; // Since this component only modifies the header, it doesn't need to render any content
};
