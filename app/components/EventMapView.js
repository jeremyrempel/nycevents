"use strict";

/**
 * Created by jrempel on 6/14/17.
 */
import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

const EventMapView = ({ coords, title }) =>
  <MapView
    style={styles.container}
    initialRegion={{
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }}
  >
    <MapView.Marker title={title} coordinate={coords} />
  </MapView>;

export default EventMapView;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
