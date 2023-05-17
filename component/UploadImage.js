import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import * as DocumentPicker from "expo-document-picker";
import { auth, database, storage } from "../config/firebase";

  const [selectedFile, setSelectedFile] = useState("");

  export const submitImage = () => {
    const storageRef = ref(storage, "images");
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, selectedFile)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");
      })
      .catch((error) => {
        console.log(error.message);
      });
      return storageRef;
  };

  export const handleFileUpload = async () => {
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

    // const handleFileUpload = async () => {
    //   try {
    //     const res = await DocumentPicker.pick({
    //       type: [DocumentPicker.types.allFiles],
    //       mimeTypes: ["image/jpeg", "image/png"],
    //     });

    //     const file = res[0];
    //     setSelectedFile(file);
    //     // Do something with the selected file
    //     console.log("Selected file:", file);
    //   } catch (error) {
    //     console.log("Error selecting file:", error);
    //   }
    // };

  export const handleDeleteFile = () => {
    setSelectedFile("");
    // Perform any additional actions when deleting the file
    console.log("File deleted");
  };

