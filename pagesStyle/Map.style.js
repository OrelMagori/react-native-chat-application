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
    left: 10,
    zIndex: 1,
    right: 10,
    position: "absolute",
  },
  googlePlacesAutocompleteListView: {
    backgroundColor: "white",
  },
  googlePlacesAutocompleteTextInputContainer: {
    padding: 0,
    alignItems: "center",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  googlePlacesAutocompleteTextInput: {
    margin: 0,
    padding: 0,
    alignItems: "center",
  },
});
