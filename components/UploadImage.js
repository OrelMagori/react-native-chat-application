import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import * as DocumentPicker from "expo-document-picker";
import { auth, database, storage } from "../config/firebase";

const [selectedFile, setSelectedFile] = useState("");

const handleFileUpload = async () => {
  try {
    const file = await DocumentPicker.getDocumentAsync({
      type: "image/*", // Restrict file selection to images only
    });
    if (file.type === "success") {
      setSelectedFile(file);
      // Do something with the selected file
      console.log("Selected file:", file);
    }
  } catch (error) {
    console.log("Error selecting file:", error);
  }
};

const submitImage = () => {
  const storageRef = ref(storage, "images");
  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, selectedFile)
    .then((snapshot) => {
      console.log("Uploaded a blob or file!");
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const handleDeleteFile = () => {
  setSelectedFile("");
  // Perform any additional actions when deleting the file
  console.log("File deleted");
};

import React from "react";
import { View } from "react-native/types";

export const uploadImage = () => {
  return (
    <View>
      <TouchableOpacity style={styles.fileButton} onPress={handleFileUpload}>
        <Text style={{ fontWeight: "bold", color: "darkblue", fontSize: 18 }}>
          <Entypo name="attachment" size={25} color={colors.black} /> Choose a
          picture
        </Text>
      </TouchableOpacity>
      {selectedFile && (
        <View style={styles.selectedFileContainer}>
          <TextInput
            style={styles.selectedFileInput}
            value={selectedFile.name}
            editable={false}
          />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDeleteFile}
          >
            <Entypo name="cross" size={25} color="red" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
