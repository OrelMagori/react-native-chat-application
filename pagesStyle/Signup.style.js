import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "darkblue",
    alignSelf: "center",
    paddingBottom: 24,
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
    alignSelf: "center",
    width: 230,
    height: 100,
    marginTop: 70,
  },
  whiteSheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: "darkblue",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  fileButton: {
    backgroundColor: "#fff",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderColor: "darkblue",
    borderWidth: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },
});
