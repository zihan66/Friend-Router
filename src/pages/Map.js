import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default class Map extends React.Component {
  render() {
    return (
      <View style={styles.container}>
       <Text>{this.props.navigation.state.params.token} </Text>
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
  }
});