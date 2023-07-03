import React, { useState } from "react";
import { View, Text } from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { API_KEY } from "../env.json";
import { GoBack } from "../components/GoBack";
import { Signout } from "../components/Signout";
import { styles } from "../pagesStyle/Map.style";

const Map = () => {
  // the variable pin is used to set the pin on the map
  const [pin, setPin] = useState({
    latitude: 32.103376857642246,
    longitude: 35.20905301042528,
  });

  // the variable region is used to set the region of the map
  const [region, setRegion] = useState({
    latitude: 32.103376857642246,
    longitude: 35.20905301042528,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <>
      <View style={{ marginTop: 10, flex: 1 }}>
        <GoBack />
        <Signout />
        {/* the GooglePlacesAutocomplete component is used to search for places */}
        <GooglePlacesAutocomplete
          fetchDetails
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
            location: `${region.latitude},${region.longitude}`, // the location is set to the region of the map
          }}
          styles={{
            container: styles.googlePlacesAutocompleteContainer,
            listView: styles.googlePlacesAutocompleteListView,
            textInputContainer:
              styles.googlePlacesAutocompleteTextInputContainer,
            textInput: styles.googlePlacesAutocompleteTextInput,
          }}
        />
        {/* the MapView component is used to show the map */}
        <MapView
          style={styles.map}
          //initialRegion is a prop that sets the initial region of the map
          initialRegion={{
            latitude: 32.103376857642246,
            longitude: 35.20905301042528,
            latitudeDelta: 0.00522,
            longitudeDelta: 0.00921,
          }}
          provider="google" // for google maps insted of default map of the phone
        >
          {/* the Marker component is used to show a pin on the map */}
          <Marker
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          />
          <Marker
            coordinate={pin}
            pinColor="red"
            draggable
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
            {/* the Callout component is used to show a popup when the marker is pressed */}
            <Callout>
              <Text>I'm Here</Text>
            </Callout>
          </Marker>
          <Circle center={pin} radius={300}></Circle>
        </MapView>
      </View>
    </>
  );
};

export default Map;

