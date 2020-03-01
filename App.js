import React from 'react';
import MapView from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default class App extends React.Component {

    state = {
      latitude: null,
      longitude: null
    }

  async componentDidMount(){

    const {status} = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted'){
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }



    navigator.geolocation.getCurrentPosition(
    ({coords : {latitude, longitude} }) => this.setState({latitude, longitude}, () => console.log('State:', this.state)),

    (error) => console.log('Error', error)
    )
    
  }


  render() {
     const latitude = this.state.latitude
     const longitude = this.state.longitude
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle} 
        showsUserLocation={true} 
        showsMyLocationButton={true}
        initialRegion={{
          latitude: 30.622370,
          longitude: -96.325851,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        >
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});