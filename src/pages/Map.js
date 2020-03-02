import React, { Component } from 'react';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {View, StyleSheet, Dimensions } from 'react-native';


export default class Map extends Component {
  constructor(props){
    super(props);

    this.state = {
      region: {
      latitude: 30.622370,
      longitude: -96.325851,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421},
    }

    this._getLocationAsync().then(this.sendLocation);
  }




  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if(status !== 'granted')
        console.log('Permission to access was denied.')

    let location = await Location.getCurrentPositionAsync({enabledHighAccuracy: true});
    let region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045
    }
    this.setState({ region: region});
    return location
  }


  sendLocation = async(location) =>{
    try {
        const response = await fetch('https://friendrouter.xyz/api/location', {
            method:'POST',
            body: JSON.stringify(location.coords),
            headers: {'Authorization' : 'Bearer ' + this.props.navigation.state.params.token,
                      'Content-Type' : 'application/json'
          }
        });
        const responseJson = await response.json();
        console.log(JSON.stringify(responseJson))
        
    } catch (error) {
        console.error(error);
    }
    
    this.props.navigation.navigate('Next', {token : this.state.responseJson.token});
}

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle}
        region={this.state.region}
        showUserLocation
        showCompass={true}
        rotateEnabled={false}
        showsMyLocationButton={true}
        >
        <MapView.Marker
        coordinate={{latitude: this.state.region.latitude,
            longitude:this.state.region.longitude}}
            title={"Zihan"}
            description={"In class"}
        >
          
        </MapView.Marker>

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