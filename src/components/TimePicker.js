import React, { Component } from 'react';
import { StyleSheet, Button, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
export default class TimePicker extends Component{
    constructor(props){
        super(props);
        this.state = 
        {
           show : false,
           time : new Date()
        }
    }

    showTimepicker = () => {
        this.setState({show: true})
    };

    hideTimepicker = () =>{
        this.setState({show: false})
    };

    toggleTimePicker = () => {
      this.setState({show: !this.state.show});
    }

    onChange = (event, selected) => {
        // this.hideTimepicker()
        
        if (event.type == 'dismissed') {
          return;
        }

        if (event.type == 'set') {
          this.hideTimepicker();
        }

        this.props.action(selected);
        this.setState({time: selected});
    }
    
    render() {
      return (
        <View style={styles.container}>
            <View>
                <Button onPress={this.toggleTimePicker} title="Select your time" />
            </View>

            {this.state.show&&
            <View><DateTimePicker
                mode='time'
                display='default'
                value={this.state.time}
                is24Hour={false}
                onChange={this.onChange}
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