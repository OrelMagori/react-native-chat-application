import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { Entypo } from "@expo/vector-icons";
import { View, ImageBackground } from "react-native";
import { GiftedChat, Send, Composer } from "react-native-gifted-chat";

import colors from "../colors";
import { GoBack } from "../components/GoBack";
import { Signout } from "../components/Signout";
import { styles } from "../pagesStyle/Chat.style";
import { auth, database } from "../config/firebase";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [avatarNumber, setAvatarNumber] = useState(0);
  const [userList, setUsersList] = useState([]);

  // the function get the users list
  useLayoutEffect(() => {
    const collectionRef = collection(database, "users");
    const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
      const users = querySnapshot.docs.map((doc) => doc.data());
      setUsersList(users);
    });

    return unsubscribe;
  }, []);

  // the function get the avatar random number
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const getUser = userList.find((user) => user?.uid === currentUser?.uid);
      if (getUser) {
        setAvatarNumber(getUser.numberAvatar);
      }
    }
  }, [userList]);

  // the function get the messages from the database
  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    // Listen for snapshot events
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

  // the function send the messages to the database
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  // the function render the send button
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <Entypo name="chevron-right" size={24} color={colors.black} />
        </View>
      </Send>
    );
  };

  // the function render the input toolbar
  const renderInputToolbar = (props) => {
    return (
      <View style={styles.inputContainer}>
        <Composer {...props} textInputStyle={styles.textInput} />
        {renderSend(props)}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <GoBack />
      <Signout />
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/3695238/pexels-photo-3695238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          // uri: "https://cdn.pixabay.com/photo/2018/03/15/08/54/grid-3227459_960_720.jpg",
        }}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.chatContainer}>
          <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={false}
            showUserAvatar
            onSend={onSend}
            placeholder="Message"
            textInputStyle={styles.textInput}
            renderSend={renderSend}
            user={{
              _id: auth?.currentUser?.email,
              avatar: `https://i.pravatar.cc/${avatarNumber}`,
            }}
            renderInputToolbar={renderInputToolbar}
            alwaysShowSend
          />
        </View>
      </ImageBackground>
    </View>
  );
}
