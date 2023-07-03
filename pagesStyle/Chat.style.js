import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  chatContainer: {
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  textInput: {
    height: 40,
    marginRight: 10,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  sendButton: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});