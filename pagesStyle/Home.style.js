import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  headerHelloUser: {
    marginTop: 100,
    justifyContent: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  image: {
    alignItems: "center",
    // backgroundColor: "#ffff",
    width: 230,
    height: 100,
    marginTop: 200,
  },
  chatButton: {
    height: 50,
    width: 50,
    alignItems: "center",
    flexDirection: "row",
    marginTop: 120,
    marginLeft: 45,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
