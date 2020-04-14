import { Header, SearchBar, ListItem} from 'react-native-elements';
import React, { Component } from 'react';
import {StyleSheet, View, FlatList, TextInput, Button} from 'react-native';
import TimePicker from '../components/TimePicker';
import LocationPicker from '../components/LocationPicker';
export default class Invitation extends Component {
    constructor(props){
        super(props);
        this.setLocation = this.setLocation.bind(this)
        this.setTime = this.setTime.bind(this)
        var friends = []
        console.log(this.props.navigation.state.params.token)
        var users = this.props.navigation.state.params.users
        for (var i = 0; i < users.length ; i++){
            var user = {}
            user.name = users[i].title
            user.is_active = users[i].pinColor == 'red' ? true : false
            user.is_added = false
            friends.push(user)
        }
        this.state = 
        {
          search: '',
          contacts: friends,
          inMemoryContacts: friends,
          addedContacts: [],
          onFocus: false,
          time: new Date(),
          location: "",
          note: '',
        }
    }

    showList = () =>{
        this.setState({onFocus:true})
    }


    addFriend = (name) =>{
        var friend = {username: name}
        this.setState({addedContacts: [...this.state.addedContacts, friend]})
        this.setState({onFocus:false})
    }
    
    searchContacts = (value) =>{
        this.setState({search: value});
        const filteredContacts = this.state.inMemoryContacts.filter(
            contact => {
                let contactLowercase = (contact.name).toLowerCase()
                let searchTermLowercase = value.toLowerCase()

                return contactLowercase.indexOf(searchTermLowercase)> -1;
            }
        )
        this.setState({contacts: filteredContacts});
    } 

    renderItem = ({ item }) => (
        <ListItem
          title={item.name}
          subtitle={item.is_active? "online" : "offline"}
          leftAvatar={
            {  
               source: { uri: item.avatar_url },
               title: item.name[0],
            }
          }
          badge={{value: item.is_added?"added" : ""}}
          onPress={()=>this.addFriend(item.name)}
        />
    )

    renderAddedItem = ({ item }) => (
        <ListItem
          title={item.username}
          leftAvatar={{ 
              source: { uri: item.avatar_url },
              title: item.username[0],

            }
        
        }
        />
    )

    sendList = async() =>{
        try {
            var participants = this.state.addedContacts.map(x => x.username);
            const res = {destination: this.state.location, 
                    description: this.state.note, 
                    participants: participants, 
                    start_time: this.state.time}
            const response = await fetch('https://friendrouter.xyz/api/activity', {
                method:'POST',
                body: JSON.stringify(res),
                headers: {'Authorization' : 'Bearer ' + this.props.navigation.state.params.token,
                          'Content-Type' : 'application/json'
              }
            });
            // const responseJson = await response.json();
            //  console.log(responseJson)
            this.props.navigation.goBack()

            
        } catch (error) {
            console.error(error);
        }
    }

    setTime = (value) =>{
        this.setState({
            time: value
        })
    }

    setLocation = (value) =>{
        this.setState({
            location: value
        })
    }

    setNote = (value) =>{
        this.setState({
            note: value
        })
    }



  render() {
    const { search } = this.state;
    return (
        <View style={styles.container}>
            <Header
                centerComponent={{text:"Start your invitation", style: {fontSize: 18, flex: 1, fontWeight: "bold"}}}
                backgroundColor={'#90caf9'}
                containerStyle={{height:80}}
            />
            <View>
                <SearchBar
                    placeholder="Search a friend"
                    onChangeText={this.searchContacts}
                    value={search}
                    platform="android"
                    onFocus={this.showList}
                />

            </View>

            {this.state.onFocus &&<View>
                <FlatList 
                    data={this.state.contacts} 
                    renderItem={this.renderItem} 
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>}
            <View style={{flex: 2}}>
            <FlatList 
                    horizontal
                    data={this.state.addedContacts} 
                    renderItem={this.renderAddedItem} 
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state}
                />
            </View>
            <View style={{flex: 2}}>
                <TimePicker action={this.setTime}/>
            </View>
            <View style={{flex: 2}}>
            <LocationPicker action={this.setLocation}/>
            </View>
            <View style={{flex: 4}}>
                <TextInput
                    style={styles.textinput}
                    value={this.state.note}
                    onChangeText={this.setNote}
                    maxLength = {33}
                />
            </View>
            <View style={{flex: 1}}>
                <Button
                title="Press me"
                onPress={this.sendList}/>
            </View>
        </View>
    )
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5faf6',
        fontSize: 30,
    },
    search: {
        flex: 1,
        marginLeft: 8,
        height: 50,
        width: 300,
        paddingBottom: 0,
        paddingHorizontal: 0,
        fontSize: 16,
    },
    textinput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
    }

    }
)