import React, { Component } from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import Login from './src/pages/Login';
import Navigator from './src/routers/homeStack';
import Invitation from './src/pages/Invitation';
export default class App extends Component{
  render() {
    return (
        <Navigator>
          <View style={styles.container}>
            <StatusBar backgroundColor='#5d99c6'
              barStyle='light-content'
            />
          {/* <Invitation/> */}
          <Login/>
          </View>
       </Navigator>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#90caf9',
  },
});