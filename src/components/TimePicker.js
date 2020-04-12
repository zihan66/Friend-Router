import React, { Component } from 'react';
import { StyleSheet, Button, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
export default class TimePicker extends Component{
    constructor(props){
        super(props);
        this.state = 
        {
           show : false
        }
    }

    showTimepicker = () => {
        this.setState({show: true})
    };
    
    render() {
      return (
        <View style={styles.container}>
            <View>
                <Button onPress={this.showTimepicker} title="Select your time" />
            </View>

            {this.state.show&&<View><DateTimePicker
                mode='time'
                value={new Date()}
                is24Hour={false}
            />
            </View>}
        </View>
      )
    }
  }
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });