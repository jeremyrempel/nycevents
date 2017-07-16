"use strict";

/**
 * Created by jrempel on 6/14/17.
 */
import React from "react";
import {
  Container,
  Text,
  Left,
  Button,
  Header,
  Body,
  Segment,
  Right,
  Icon
} from "native-base";
import { Share } from "react-native";
import EventMapView from "./EventMapView";
import EventViewOneDetail from "./EventViewOneDetail";

export default class EventViewOne extends React.Component {
  static navigationOptions = { header: null };

  constructor() {
    super();

    this.state = {
      currentView: "detail"
    };
  }

  render() {
    const { goBack } = this.props.navigation;
    const { event } = this.props.navigation.state.params;

    return (
      <Container>
        <Header hasSegment>
          <Left>
            <Button onPress={() => goBack()} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Segment style={{ paddingRight: 25 }}>
              <Button
                first
                active={this.state.currentView == "detail"}
                onPress={() => this.setState({ currentView: "detail" })}
              >
                <Text>Detail</Text>
              </Button>
              <Button
                last
                active={this.state.currentView == "map"}
                onPress={() => this.setState({ currentView: "map" })}
              >
                <Text>Map</Text>
              </Button>
            </Segment>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() =>
                Share.share({
                  message:
                    event.title + "\n" + event.link + "\nNYC Park Events App",
                  dialogTitle: event.title,
                  url: event.link
                })}
            >
              <Icon ios="ios-share-outline" android="md-share" />
            </Button>
          </Right>
        </Header>

        {this.state.currentView == "map" &&
          <EventMapView title={event.location} coords={event.coordinates} />}

        {this.state.currentView == "detail" &&
          <EventViewOneDetail event={event} />}
      </Container>
    );
  }
}
