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
import EventList from "./components/EventList";
import SearchView from "./components/SearchView";
import { distance } from "./lib/Distance";
import { fetchAndStore } from "./lib/FetchStore";
import { getLatLong } from "./lib/Util";

const dataSource = "https://www.nycgovparks.org/xml/events_300_rss.json";
const mileRadius = 6;

export default class HomeScreen extends React.Component {
  static navigationOptions = { header: null };

  constructor() {
    super();

    this.state = {
      events: [],
      isLoading: true,
      error: null,
      searchVisible: false,
      latitude: null,
      longitude: null,
      filter: {
        searchText: null,
        limitGeo: false,
        limitDistance: mileRadius
      }
    };

    this.rowSelect = this.rowSelect.bind(this);
    this.toggleSearchLimitGeo = this.toggleSearchLimitGeo.bind(this);
    this.onTextChangeSearchLimitDistance = this.onTextChangeSearchLimitDistance.bind(
      this
    );

    // if geo limiter, get the coordinates
    if (this.state.filter.limitGeo) {
      this.updateGeo();
    }
  }

  componentDidMount() {
    fetchAndStore(dataSource, eventData => {
      this.setState({
        isLoading: false,
        events: eventData
      });
    });
  }

  // toggle the searchLimitGeo state mutate
  toggleSearchLimitGeo() {
    const newSearchLimitGeo = !this.state.filter.limitGeo;
    if (newSearchLimitGeo) {
      this.updateGeo();
    }

    // mutate the state
    // todo is there a better way to do this?
    const newFilter = this.state.filter;
    newFilter.limitGeo = newSearchLimitGeo;
    this.setState({
      filter: newFilter
    });
  }

  onTextChangeSearchLimitDistance(searchLimitDistance) {
    // mutate the state

    const newFilter = this.state.filter;
    newFilter.limitDistance = searchLimitDistance;
    this.setState({
      filter: newFilter
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
      error => this.setState({ error: error.message })
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
        const eventCoord = getLatLong(e.coordinates);

        if (
          distance(
            eventCoord.latitude,
            eventCoord.longitude,
            this.state.latitude,
            this.state.longitude
          ) > this.state.searchLimitDistance
        ) {
          return false;
        }
      }

      // text filter
      if (this.state.filter.searchText) {
        const st = this.state.filter.searchText.toUpperCase();
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
    const eventList = this.getEventsFiltered();

    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input
              placeholder="Search"
              onChangeText={searchText => {
                const newFilter = this.state.filter;
                newFilter.searchText = searchText;
                this.setState({ filter: newFilter });
              }}
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
                ? <Text>
                    {this.state.searchVisible ? "Less" : "More"}
                  </Text>
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
            searchLimitGeo={this.state.filter.limitGeo}
            searchLimitDistance={this.state.filter.limitDistance}
            onTextChangeSearchLimitDistance={
              this.onTextChangeSearchLimitDistance
            }
            toggleSearchLimitGeo={this.toggleSearchLimitGeo}
            currentEventsNumber={eventList.length}
            totalEventsNumber={this.state.events.length}
          />}
        {this.state.error && <Text>Error loading event data</Text>}

        {this.state.loading &&
          <ActivityIndicator size="large" style={{ paddingTop: 150 }} />}
        <EventList events={eventList} onPress={this.rowSelect} />
      </Container>
    );
  }
}
