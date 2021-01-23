import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Geolocation from "react-native-geolocation-service";

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
}

Geolocation.getCurrentPosition(
  //Will give you the current location
  (position) => {
    //getting the Longitude from the location json
    const currentLongitude =
      JSON.stringify(position.coords.longitude);

    //getting the Latitude from the location json
    const currentLatitude =
      JSON.stringify(position.coords.latitude);

   }, (error) => alert(error.message), {
     enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
   }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});