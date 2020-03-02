import React from 'react';
import {Text, View, Button} from 'react-native';

export default class Network extends React.Component {

  constructor(props){
    super(props);
    this.state ={ text: ''};
  }

  async componentDidMount(){
    try {
            let formData = new FormData();
            formData.append('username', this.props.username)
            formData.append('password', this.props.password)
            const response = await fetch('https://friendrouter.xyz/api/authorize', {
                method:'POST',
                body: formData
            });
            const responseJson = await response.json();
            this.setState({
                text: JSON.stringify(responseJson)
            });
        }
    catch (error) {
        console.error(error);
    }
  }


  render(){
      return (
        <View>
            <Button title='Post Data'></Button>
            <Text>{this.state.text}</Text>
        </View>
      );
  }


}



