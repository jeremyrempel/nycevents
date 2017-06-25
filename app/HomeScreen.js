"use strict";

import React from "react";
import { ActivityIndicator } from "react-native";
import {
  Container,
  Header,
  Icon,
  Button,
  Text,
  Right,
  Body,
  Item,
  Input
} from "native-base";
import EventList from "./EventList";
import SearchView from "./SearchView";

const dataSource = "https://www.nycgovparks.org/xml/events_300_rss.json";
const mileRadius = 3;

export default class HomeScreen extends React.Component {
  static navigationOptions = { header: null };

  constructor() {
    super();

    this.state = {
      isLoading: true,
      events: [],
      error: null,
      latitude: null,
      longitude: null,
      searchVisibile: false
    };

    this.rowSelect = this.rowSelect.bind(this);
  }

  componentDidMount() {
    fetch(dataSource)
      .then(response => response.json())
      .then(responseJson => {
        let dateNow = Date.now();

        // filter out any dates before now
        let eventsAfterNow = responseJson.filter(e => {
          const dateStrSplit = e.startdate.split("-");

          // https://stackoverflow.com/questions/141348/what-is-the-best-way-to-parse-a-time-into-a-date-object-from-user-input-in-javas
          const time = e.starttime.match(/(\d+)(?::(\d\d))?\s*(p?)/);
          const hours = parseInt(
            parseInt(time[1]) + (parseInt(time[1]) < 12 && time[3] ? 12 : 0)
          );
          const minutes = parseInt(time[2]) || 0;

          // year, month, date, hour, minute, second, millisecond
          const dateStart = new Date(
            dateStrSplit[0],
            dateStrSplit[1] - 1,
            dateStrSplit[2],
            hours,
            minutes,
            0,
            0
          );

          return dateStart.getTime() >= dateNow;
        });

        this.setState({
          isLoading: false,
          events: eventsAfterNow
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          error: error,
          text: null
        });
        console.error(error);
      });

    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  rowSelect(selectedEvent) {
    const { navigate } = this.props.navigation;
    navigate("EventView", { event: selectedEvent });
  }

  eventsFiltered() {
    return this.state.events.filter(e => {
      // filter on current location
      // 0.01 degrees = 1.1132 km = 0.69 miles
      const p = 0.691710411 * 0.01 * mileRadius;
      const eventCoord = e.coordinates.split(",");
      const eventLat = Number(eventCoord[0]);
      const eventLong = Number(eventCoord[1]);

      if (
        eventLat > this.state.latitude + p ||
        eventLat < this.state.latitude - p ||
        eventLong > this.state.longitude + p ||
        eventLong < this.state.longitude - p
      ) {
        return false;
      }

      return true;
    });
  }

  render() {
    let listView;
    if (this.state.error) {
      listView = <Text>Error loading event data</Text>;
    }
    if (this.state.isLoading) {
      listView = <ActivityIndicator size="large" style={{ paddingTop: 150 }} />;
    } else {
      listView = (
        <EventList events={this.eventsFiltered()} onPress={this.rowSelect} />
      );
    }

    return (
      <Container>
        <Header>
          <Body>
            <Item>
              <Icon name="ios-search" />
              <Input placeholder="Search" />
            </Item>
          </Body>
          <Right>
            <Button transparent>
              <Icon
                ios={this.state.searchVisibile ? "ios-arrow-down" : "ios-more"}
                android="md-more"
                onPress={() => {
                  this.setState({
                    searchVisibile: !this.state.searchVisibile
                  });
                }}
              />
            </Button>
          </Right>
        </Header>

        {this.state.searchVisibile &&
          <SearchView
            latitude={this.state.latitude}
            longitude={this.state.longitude}
          />}
        {listView}
      </Container>
    );
  }
}
