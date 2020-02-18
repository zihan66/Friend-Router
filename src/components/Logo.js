import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Logo extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Image
                    source={require('../images/Logo.png')}/>
                <Text style={styles.logoText}>
                    Weclome to Friend Router
                </Text>
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
    logoText: {
        marginVertical:18,
        fontSize: 20,
        color: 'white'
    }
 });