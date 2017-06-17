import React from 'react'
import { H1 } from 'native-base'
import MapView from 'react-native-maps'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

const EventMapView = ({handleChangeView, currentView}) => (
  <View style ={styles.container}>
    <MapView
      style={styles.map}
      region={{
        latitude: 40.713918,
        longitude: -74.004259,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
    </MapView>
  </View>
)

export default EventMapView
