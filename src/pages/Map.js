import React, { Component } from 'react';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {View, StyleSheet, Dimensions, Text, Alert} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { Notifications } from 'expo';
import Constants from 'expo-constants';


export default class Map extends Component {
  constructor(props){
    super(props);

    this.state = {
      region: {
      latitude: 30.622370,
      longitude: -96.325851,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421},

      friends: null,
      expoPushToken: ''
    }
    var token = this.props.navigation.state.params.token

    setInterval(() => {
      this._getLocationAsync().then(this.sendLocation).then(this.getLocations);
    }, 5000);
  }




  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if(status !== 'granted')
        console.log('Permission to access was denied.')

    let location = await Location.getCurrentPositionAsync({enabledHighAccuracy: true});
    let current_region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.045
    }
    this.setState({ region: current_region});
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
        
    } catch (error) {
        console.error(error);
    }
}
  newInvitation = () =>{
    console.log(this.state.friends)
    this.props.navigation.navigate('Create', {users : this.state.friends, token : this.props.navigation.state.params.token})
  }

  getLocations = async() =>{
    try{
      const response = await fetch('https://friendrouter.xyz/api/users', {
        headers: new Headers({'Authorization' : 'Bearer ' + this.props.navigation.state.params.token
        })
      });
      const responseJson = await response.json();
      // console.log(JSON.stringify(responseJson))  
      var markers = []
      for (var i = 0; i < responseJson.users.length; i++){
          var marker = {};
          var user = responseJson.users[i];
          if (user.location == null)
              continue;
          marker.title = user.first_name;
          marker.coordinates = {
            latitude: user.location.location.latitude,
            longitude: user.location.location.longitude
          };
          marker.pinColor = user.is_active ? 'red' : 'wheat';
          markers.push(marker)
      }
      this.setState({friends: markers})
      }
      catch (error) {
        console.error(error);
      }
      
  }

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }


    // Send notification token to server
    const response = await fetch('https://friendrouter.xyz/api/expopushtoken', {
      headers: new Headers({
        'Authorization': 'Bearer ' + this.props.navigation.state.params.token,
        'Content-Type': 'application/json'
      }),
      method: 'POST',
      body: JSON.stringify({'token': this.state.expoPushToken})
    });

    console.log(response.status);
  };

  componentDidMount() {
    if (!this.state.expoPushToken) {
      this.registerForPushNotificationsAsync();
      this._notificationSubscription && this._notificationSubscription.remove();
      this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }
  }

  _handleNotification = notification => {
    console.log(notification);
    Alert.alert(notification.data.title, notification.data.details);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.mapStyle}
         initialRegion={this.state.region}
        showUserLocation
        showCompass={true}
        rotateEnabled={false}
        showsMyLocationButton={true}
        >
        {this.state.friends&&this.state.friends.map((marker, index) => (
        <MapView.Marker 
          key ={index}
          coordinate={
            { 
              latitude: marker.coordinates.latitude,
              longitude: marker.coordinates.longitude,
            }
          }
          title={marker.title}
          pinColor={marker.pinColor}
          />
        ))}

        <MapView.Marker
        

          coordinate={
              { 
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude
              }
            }

            title={this.props.navigation.state.params.name}
            description={"In class"}
            pinColor={'red'}
        >
        </MapView.Marker>

        </MapView>
        <ActionButton buttonColor='#90caf9'>
          <ActionButton.Item buttonColor='#90caf9' title = 'New Invitation' onPress={this.newInvitation}>
          <Icon name="md-create" style={styles.actionButtonIcon} />   
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#90caf9' title="Received Invitations" onPress={() => {}}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>

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
    zIndex: -1,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'red',
},
pinText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
},
button: {
  position: 'absolute',
}
});