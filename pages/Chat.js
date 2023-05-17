import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, database } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import colors from "../colors";
import { Entypo } from "@expo/vector-icons";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    const fetchUserAvatar = async () => {
      try {
        const imageUrl = await getImageUrl(imageName);
        setUserAvatar(imageUrl);
      } catch (error) {
        console.log("Error retrieving user avatar:", error);
      }
    };
    fetchUserAvatar();
  }, []);

  const getImageUrl = async (imageName) => {
    try {
      const url = await storage.ref().child(imageName).getDownloadURL();
      return url;
    } catch (error) {
      console.log("Error retrieving image URL:", error);
      return null;
    }
  };

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}
        >
          <Entypo
            name="log-out"
            size={24}
            color={colors.black}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot unsusbscribe");
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    // setMessages([...messages, ...messages]);
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    // <>
    //   {messages.map(message => (
    //     <Text key={message._id}>{message.text}</Text>
    //   ))}
    // </>
    <>
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/3695238/pexels-photo-3695238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        }}
        resizeMode="cover"
        style={styles.image}
      >
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={false}
          showUserAvatar={false}
          onSend={(messages) => onSend(messages)}
          placeholder="    Message"
          textInputStyle={{
            backgroundColor: "white",
            borderRadius: 25,
            elevation: 2,
            marginBottom: 10,
          }}
          style={{ backgroundColor: "transparent" }}
          user={{
            _id: auth?.currentUser?.email,
            avatar: userAvatar,
          }}
        />
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
