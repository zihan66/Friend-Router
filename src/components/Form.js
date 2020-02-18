import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';

export default class Form extends Component {
    render(){
        return(
            <View style={styles.container}>
                <TextInput style={styles.inputBox}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputBox: {
        width: 300,
        color: 'black'
    }
 });