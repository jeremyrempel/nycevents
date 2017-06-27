"use strict";

import React from "react";
import { ActivityIndicator, Platform } from "react-native";
import {
  Container,
  Header,
  Icon,
  Button,
  Text,
  Right,
  Item,
  Input
} from "native-base";
import EventList from "./EventList";
import SearchView from "./SearchView";
import { distance } from "./Distance";

const dataSource = "https://www.nycgovparks.org/xml/events_300_rss.json";
const mileRadius = 6;

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
      searchVisible: false,
      searchText: null,
      searchLimitGeo: false,
      searchLimitDistance: mileRadius
    };

    this.rowSelect = this.rowSelect.bind(this);
    this.toggleSearchLimitGeo = this.toggleSearchLimitGeo.bind(this);
    this.onTextChangeSearchLimitDistance = this.onTextChangeSearchLimitDistance.bind(
      this
    );

    // if geo limiter, get the coordinates
    if (this.state.toggleSearchLimitGeo) {
      this.updateGeo();
    }
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
          if (e.endtime) {
            const time = e.endtime.match(/(\d+)(?::(\d\d))?\s*(p?)/);
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
          } else {
            return true;
          }
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
      });
  }

  // toggle the searchLimitGeo state mutate
  toggleSearchLimitGeo() {
    const newSearchLimitGeo = !this.state.searchLimitGeo;
    if (newSearchLimitGeo) {
      this.updateGeo();
    }

    // mutate the state
    this.setState({
      searchLimitGeo: newSearchLimitGeo
    });
  }

  onTextChangeSearchLimitDistance(searchLimitDistance) {
    // mutate the state
    this.setState({
      searchLimitDistance: searchLimitDistance
    });
  }

  // update geo and notify state mutation
  updateGeo() {
    // get current location
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 60000 }
    );
  }

  rowSelect(selectedEvent) {
    const { navigate } = this.props.navigation;
    navigate("EventView", { event: selectedEvent });
  }

  getEventsFiltered() {
    return this.state.events.filter(e => {
      // geo filter
      if (
        this.state.searchLimitGeo &&
        this.state.latitude &&
        this.state.longitude
      ) {
        // filter on current location
        const eventCoord = e.coordinates.split(",");
        if (
          distance(
            Number(eventCoord[0]),
            Number(eventCoord[1]),
            this.state.latitude,
            this.state.longitude
          ) > this.state.searchLimitDistance
        ) {
          return false;
        }
      }

      // text filter
      if (this.state.searchText) {
        const st = this.state.searchText.toUpperCase();
        return (
          e.title.toUpperCase().includes(st) ||
          e.location.toUpperCase().includes(st) ||
          e.startdate.toUpperCase().includes(st)
        );
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
        <EventList events={this.getEventsFiltered()} onPress={this.rowSelect} />
      );
    }

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              onChangeText={searchText => this.setState({ searchText })}
            />
          </Item>

          <Right>
            <Button
              transparent
              onPress={() => {
                this.setState({
                  searchVisible: !this.state.searchVisible
                });
              }}
            >
              {Platform.OS === "ios"
                ? <Text>{this.state.searchVisible ? "Less" : "More"}</Text>
                : <Icon
                    name={
                      this.state.searchVisible
                        ? "md-arrow-round-up"
                        : "md-arrow-round-down"
                    }
                  />}
            </Button>
          </Right>
        </Header>

        {this.state.searchVisible &&
          <SearchView
            latitude={this.state.latitude}
            longitude={this.state.longitude}
            searchLimitGeo={this.state.searchLimitGeo}
            searchLimitDistance={this.state.searchLimitDistance}
            onTextChangeSearchLimitDistance={
              this.onTextChangeSearchLimitDistance
            }
            toggleSearchLimitGeo={this.toggleSearchLimitGeo}
            currentEventsNumber={this.getEventsFiltered().length}
            totalEventsNumber={this.state.events.length}
          />}
        {listView}
      </Container>
    );
  }
}
