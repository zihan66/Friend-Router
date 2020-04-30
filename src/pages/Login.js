import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Logo from '../components/Logo';
import Form from '../components/Form';

export default class Login extends Component {
    render(){
      return(
         <View style={styles.container}>
            <Logo/>
            <Form navigation={this.props.navigation}/>
            <View style={styles.signup}>
               <Text style={styles.signupText}>Don't have an account yet?</Text>
               <Text style={styles.signupButton}>Signup</Text>
            </View>
         </View>
      )
    }
  }

const styles = StyleSheet.create({
   container: {
     flexGrow: 1,
     backgroundColor: '#90caf9',
     alignItems: 'center',
     justifyContent: 'center',
   },
   signup: {
      flexGrow: 1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
   
      marginBottom:60,
      
   },
   signupText: {
      color:'white',
      fontSize: 16,
   },
   signupButton: {
      color: 'white',
      fontSize: 16,
      fontWeight:'bold'
   }
});