import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

export default class Form extends Component {
    constructor(props){
        super(props);
        this.state = 
        {
            responseJson : null
        }
    }

    pressHandler = async() =>{
        try {
            let formData = new FormData();
            formData.append('username', 'admin');
            formData.append('password', 'admin1');
            const response = await fetch('https://friendrouter.xyz/api/authorize', {
                method:'POST',
                body: formData
            });
            this.setState({responseJson: await response.json()});
        } catch (error) {
            console.error(error);
        }
        
        this.props.navigation.navigate('Next', {token : this.state.responseJson.token});
    }

    render(){     
        return(
            <View style={styles.container} >
                <TextInput style={styles.inputBox} 
                    underlineColorAndroid={'rgba(0,0,0,0)'} 
                    placeholder = 'Email/Username'
                    placeholderTextColor = '#5d99c6'
                />
                <TextInput style={styles.inputBox} 
                    underlineColorAndroid={'rgba(0,0,0,0)'} 
                    placeholder = 'Password'
                    secureTextEntry = {true}
                    placeholderTextColor = '#5d99c6'
                />
                <TouchableOpacity style={styles.button} onPress={this.pressHandler}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputBox: {
        width: 300,
        height: 50,
        backgroundColor: '#ceddf2',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color:'#5d99c6',
        marginVertical: 12,
    },
    button: {
        width:200,
        backgroundColor: '#5d99c6',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 10,
    },
    buttonText: {
        color:'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
 });