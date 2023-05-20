import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  googlePlacesAutocompleteContainer: {
    position: "absolute",
    left: 10,
    right: 10,
    zIndex: 1,
  },
  googlePlacesAutocompleteListView: {
    backgroundColor: "white",
  },
  googlePlacesAutocompleteTextInputContainer: {
    alignItems: "center",
    padding: 0,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  googlePlacesAutocompleteTextInput: {
    padding: 0,
    margin: 0,
    alignItems: "center",
  },
});
