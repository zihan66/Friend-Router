import { Header, SearchBar, ListItem} from 'react-native-elements';
import React, { Component } from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';
import TimePicker from '../components/TimePicker';
import LocationPicker from '../components/LocationPicker';
export default class Invitation extends Component {
    constructor(props){
        super(props);
        var friends = []
        console.log(this.props.navigation.state.params.users)
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
          onFocus: false
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
                <TimePicker/>
            </View>
            <View style={{flex: 2}}>
                <LocationPicker/>
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
    }

    }
)