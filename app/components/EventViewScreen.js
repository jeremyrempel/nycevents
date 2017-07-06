"use strict";

/**
 * Created by jrempel on 6/14/17.
 */
import React from "react";
import {
  Container,
  Content,
  ListItem,
  Text,
  Left,
  Button,
  Header,
  Title,
  Body,
  List,
  Right,
  Icon,
  H1
} from "native-base";
import { Linking, Image, View, StyleSheet, Platform } from "react-native";
import MapView from "react-native-maps";
import { getLatLong } from "../lib/Util";

export default class EventViewScreen extends React.Component {
  static navigationOptions = { header: null };

  render() {
    const { goBack } = this.props.navigation;
    const { event } = this.props.navigation.state.params;

    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => goBack()} transparent>
              <Icon ios="ios-arrow-back" android="md-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>
              {event.title}
            </Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ backgroundColor: "white" }}>
          {this.showImage(event.image)}

          <List>
            <ListItem>
              <H1>
                {event.title}
              </H1>
            </ListItem>
            <ListItem>
              <Body>
                <Text>
                  {event.description
                    .replaceAll("</p>", "\n")
                    .replaceAll("<li>", "-")
                    .replaceAll("<p>", "")
                    .replaceAll("</li>", "")
                    .replaceAll("</ul>", "")
                    .replaceAll("<ul>", "")
                    .decodeHTML()
                    .replace(/<(?:.|\n)*?>/gm, "")}
                </Text>
              </Body>
            </ListItem>
            <ListItem
              onPress={() =>
                this.openMap(getLatLong(event.coordinates), event.location)}
            >
              <Body>
                <Text note>Location</Text>
                <Text style={{ color: "blue" }}>
                  {event.location}
                </Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>

            {event.parkids.length > 0 &&
              <ListItem>
                <Body>
                  <Text note>Borough</Text>
                  <Text>
                    {this.getBorough(event.parkids)}
                  </Text>
                </Body>
              </ListItem>}
            <ListItem>
              <Body>
                <Text note>Date</Text>
                <Text>
                  {event.startdate}
                </Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body>
                <Text note>Time</Text>
                <Text>
                  {event.starttime} - {event.endtime}
                </Text>
              </Body>
            </ListItem>
            <ListItem onPress={() => Linking.openURL(event.link)}>
              <Body>
                <Text note>Website</Text>
                <Text style={{ color: "blue" }}>
                  {event.link}
                </Text>
              </Body>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            {event.contact_phone &&
              <ListItem>
                <Body>
                  <Text note>Contact Phone</Text>
                  <Text>
                    {event.contact_phone}
                  </Text>
                </Body>
              </ListItem>}
            <ListItem>
              <Body>
                <Text note>Categories</Text>
                <Text>
                  {event.categories}
                </Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }

  getBorough(parkids) {
    let bCode = parkids.substring(0, 1);

    switch (bCode) {
      case "B":
        return "Brooklyn";
      case "M":
        return "Manhattan";
      case "X":
        return "Bronx";
      case "Q":
        return "Queens";
      case "R":
        return "Staten Island";
    }
  }

  showImage(remoteImageUrl) {
    if (remoteImageUrl.length > 0) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            style={{
              width: 400,
              height: 200
            }}
            source={{ uri: remoteImageUrl.replace("http", "https") }}
          />
        </View>
      );
    }
  }

  openMap(coords, locationName) {
    if (Platform.OS == "ios") {
      const iosAMap = `http://maps.apple.com/?dirflg=t&t=r&q=${locationName}&ll=${coords.latitude},${coords.longitude}`;
      Linking.openURL(iosAMap);

      // const iosGMap =
      //   "comgooglemaps-x-callback://?q=" +
      //   locationName +
      //   " New York" +
      //   "&x-success=sourceapp://?resume=true" +
      //   "&x-source=NYCEvents";
      //       Linking.canOpenURL(iosGMap).then(supported => {
      //         if (supported) {
      //           Linking.openURL(iosGMap);
      //         } else {
      //           Linking.openURL(iosAMap);
      //         }
      //       });
    } else {
      const andGMap =
        "https://www.google.com/maps/search/?api=1&query=" +
        location +
        " New York";
      Linking.openURL(andGMap);
    }
  }
}

String.prototype.decodeHTML = function() {
  var map = { gt: ">" /* , … */ };
  return this.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, function($0, $1) {
    if ($1[0] === "#") {
      return String.fromCharCode(
        $1[1].toLowerCase() === "x"
          ? parseInt($1.substr(2), 16)
          : parseInt($1.substr(1), 10)
      );
    } else {
      return map.hasOwnProperty($1) ? map[$1] : $0;
    }
  });
};

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, "g"), replacement);
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject
  },
  link: {
    color: "blue"
  }
});
