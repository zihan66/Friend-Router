import React, { Component } from 'react';
import { StyleSheet, Button, View} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
export default class LocationPicker extends Component{
    constructor(props){
        super(props);
        this.state = 
        {
        }
    }

    
    render() {
      var locations = [{value: 'Commons'}, {value : 'Zachary'}]
      return (
        <View style={styles.container}>
          <Dropdown
            label='Favorite Fruit'
            data={locations}
          />
        </View>
      )
    }
  }
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });