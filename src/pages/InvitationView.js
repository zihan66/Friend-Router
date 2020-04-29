import React, { Component } from 'react';
import { FlatList, View, SafeAreaView, StyleSheet, Text, RefreshControl, TouchableOpacity, SectionList } from 'react-native'
import Constants from 'expo-constants'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faThumbtack, faClock } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#dbefff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#90caf9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  title: {
    color: '#001436',
    fontSize: 20,
  },
  header: {
    padding: 20,
    fontSize: 32,
    backgroundColor: "#fff"
  },
  description: {
    color: '#001436',
    paddingTop: 20,
    fontSize: 18
  }
});

const formatActivities = (activities) => {
  let activityIds = new Set();
  let upcoming = [];
  let past = []

  activities.forEach(element => {
    // Check repeated ids
    if (activityIds.has(element.id)) {
      return;
    }
    activityIds.add(element.id);
    let start_time = moment.utc(element.start_time).local();

    // Earlier than now
    if (start_time.diff(moment()) < 0) {
      element.start_time = start_time.format('MMMM Do YYYY, h:mm a')
      past.push(element);
    } else {
      element.start_time = start_time.format('h:mm a') + ' (' + start_time.fromNow() + ')'
      upcoming.push(element)
    }
  });

  let activities2 = [
    {
      title: "Upcoming",
      data: upcoming
    },
    {
      title: "Past",
      data: past
    }
  ]

  return activities2;
}

class Item extends Component {
  constructor(props) {
    super(props);
    this.activity = props.item;
    this.onPress = props.onPress;
  }

  render() {
    const item = this.activity;
    return (
      <TouchableOpacity onPress={() => this.onPress(item)}>
        <View style={styles.item}>
          <Text style={styles.title}><FontAwesomeIcon icon={faUser} /> {item.owner.first_name}</Text>
          <Text style={styles.title}><FontAwesomeIcon icon={faThumbtack} /> {item.destination}</Text>
          <Text style={styles.title}><FontAwesomeIcon icon={faClock} /> {item.start_time}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  }
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
    this.onSelectActivity = props.navigation.state.params.onSelectActivity;
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
    })
    .catch(err => console.log(err));
  }

  onRefresh() {
    this.setState({refreshing: true});
    this._updateActivities();
  }

  onPress(activity) {
    this.onSelectActivity(activity);
    this.props.navigation.navigate('Next', {token: this.state.token, currentActivity: activity});
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={this.state.activities}
          renderItem={({ item }) => <Item item={item} onPress={this.onPress.bind(this)} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
          keyExtractor={item => String(item.id)}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh.bind(this)} />
          }
        />
      </SafeAreaView>
    )
  }
}