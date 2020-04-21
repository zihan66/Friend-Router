import React, { Component } from 'react';
import { FlatList, View, SafeAreaView, StyleSheet, Text, RefreshControl } from 'react-native'
import Constants from 'expo-constants'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faThumbtack, faClock } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

function Item({ item }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}><FontAwesomeIcon icon={faUser} /> {item.owner.first_name}</Text>
      <Text style={styles.title}><FontAwesomeIcon icon={faThumbtack} /> {item.destination}</Text>
      <Text style={styles.title}><FontAwesomeIcon icon={faClock} /> {item.start_time}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#ddd',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  title: {
    fontSize: 20,
  },
  description: {
    paddingTop: 20,
    fontSize: 18
  }
});

const formatActivities = (activities) => {
  let activityIds = new Set();
  let activities2 = [];

  activities.forEach(element => {
    // Check repeated ids
    if (activityIds.has(element.id)) {
      return;
    }
    console.log(element.id);

    activityIds.add(element.id);

    element.start_time = moment(element.start_time).fromNow();
    activities2.push(element);
  });

  return activities2;
}

export default class InvitationView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      token: props.navigation.state.params.token,
      refreshing: true
    }
    this._updateActivities();
  }

  _updateActivities = () => {
    fetch('https://friendrouter.xyz/api/activity', {
      headers: {'Authorization' : 'Bearer ' + this.state.token,
                'Content-Type' : 'application/json'}
    })
    .then(resp => resp.json())
    .then(json => {
      this.state.activities = json.activities;
      this.setState({
        activities: formatActivities(json.activities),
        refreshing: false
      });
      this.state.activities.forEach(element => console.log(element.id));
    })
    .catch(err => console.log(err));
  }

  onRefresh() {
    this.setState({refreshing: true});
    this._updateActivities();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.activities}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={item => String(item.id)}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />
          }
        />
      </SafeAreaView>
    )
  }
}