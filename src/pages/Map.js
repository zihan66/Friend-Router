import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Map extends Component {
    render(){
      return(
         <View style={styles.container}>
            <Text>This is a map</Text>
         </View>
      )
    }
  }

  const styles = StyleSheet.create({
      container:{

      }
  })