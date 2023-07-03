import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    paddingBottom: 24,
    color: "darkblue",
    fontWeight: "bold",
    alignSelf: "center",
  },
  input: {
    height: 50, //58
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
    borderStartWidth: 1,
    borderColor: "gray",
    backgroundColor: "#ffff",
  },
  backImage: {
    width: 230,
    height: 100,
    marginTop: 70,
    alignSelf: "center",
  },
  whiteSheet: {
    bottom: 0,
    borderTopLeftRadius: 60,
    width: "100%",
    height: "75%",
    position: "absolute",
    backgroundColor: "#fff",
  },
  form: {
    flex: 1,
    marginHorizontal: 30,
    justifyContent: "center",
  },
  button: {
    height: 50,
    marginTop: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "darkblue",
  },
  fileButton: {
    height: 50,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    borderColor: "darkblue",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
