import React, { useState } from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import { API_KEY } from "../env.json";



const Map = () =>{
  const [pin, setPin] = useState({
    latitude: 32.103376857642246,
    longitude: 35.20905301042528,
  });

  const [region, setRegion] = useState({
    latitude: 32.103376857642246,
    longitude: 35.20905301042528,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <>
      <View style={{ marginTop: 50, flex: 1 }}>
        <GooglePlacesAutocomplete
          fetchDetails={true}
          GooglePlacesSearchQuery={{
            rankby: "distance",
          }}
          placeholder="Search"
          onPress={(data, details = null) => {
            console.log(data, details);
            setRegion({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }}
          query={{
            key: API_KEY,
            language: "en",
            // components: "country: us",
            types: "establishment",
            radius: 40000,
            location: `${region.latitude},${region.longitude}`,
          }}
          styles={{
            container: {
              flex: 0,
              position: "absolute",
              width: "100%",
              zIndex: 1,
            },
            listView: { backgroundColor: "white" },
          }}
        />
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 32.103376857642246,
            longitude: 35.20905301042528,
            latitudeDelta: 0.00522,
            longitudeDelta: 0.00921,
          }}
          provider="google" // for google maps insted of default map of the phone
        >
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          />
          <Marker
            coordinate={pin}
            pinColor="red"
            draggable={true}
            onDragStart={(event) => {
              console.log("Drag start", event.nativeEvent.coordinate);
            }}
            onDragEnd={(event) => {
              setPin({
                latitude: event.nativeEvent.coordinate.latitude,
                longitude: event.nativeEvent.coordinate.longitude,
              });
            }}
          >
            <Callout>
              <Text>I'm Here</Text>
            </Callout>
          </Marker>
          <Circle center={pin} radius={300}></Circle>
        </MapView>
      </View>
    </>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});