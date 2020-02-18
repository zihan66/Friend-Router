import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Logo from '../components/Logo';
import Form from '../components/Form';

export default class Login extends Component {
    render(){
      return(
         <View style={styles.container}>
            <Logo/>
            <Form/>
         </View>
      )
    }
  }

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#90caf9',
     alignItems: 'center',
     justifyContent: 'center',
   },
});