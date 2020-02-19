import React, { Component } from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import Login from './src/pages/Login'
export default class App extends Component{
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#5d99c6'
        barStyle='light-content'
        />
        <Login/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#90caf9',
    alignItems: 'center',
    justifyContent: 'center',
  },
});