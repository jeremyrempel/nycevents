"use strict";

import React from "react";
import {
  Icon,
  List,
  ListItem,
  Text,
  Right,
  H1,
  Body,
  Content
} from "native-base";
import { Linking, Platform, Image, View } from "react-native";
import { getLatLong } from "../lib/Util";

//

const EventViewOneDetail = props =>
  <Content style={{ backgroundColor: "white" }}>
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
        source={{ uri: props.event.image.replace("http", "https") }}
      />
    </View>

    <List>
      <ListItem>
        <H1>
          {props.event.title}
        </H1>
      </ListItem>
      <ListItem>
        <Body>
          <Text>
            {props.event.description
              .replaceAll("</p>", "\n")
              .replaceAll("<li>", "-")
              .replaceAll("<p>", "")
              .replaceAll("</li>", "")
              .replaceAll("</ul>", "")
              .replaceAll("<ul>", "")
              .replaceAll("&ldquo;", '"')
              .replaceAll("&rdquo;", '"')
              .replaceAll("&rsquo;", "'")
              .decodeHTML()
              .replace(/<(?:.|\n)*?>/gm, "")}
          </Text>
        </Body>
      </ListItem>
      <ListItem
        onPress={() =>
          this.openMap(
            getLatLong(props.event.coordinates),
            props.event.location
          )}
      >
        <Body>
          <Text note>Location</Text>
          <Text style={{ color: "blue" }}>
            {props.event.location}
          </Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>

      {props.event.parkids.length > 0 &&
        <ListItem>
          <Body>
            <Text note>Borough</Text>
            <Text>
              {getBorough(props.event.parkids)}
            </Text>
          </Body>
        </ListItem>}
      <ListItem>
        <Body>
          <Text note>Date</Text>
          <Text>
            {props.event.startdate}
          </Text>
        </Body>
      </ListItem>
      <ListItem>
        <Body>
          <Text note>Time</Text>
          <Text>
            {props.event.starttime} - {props.event.endtime}
          </Text>
        </Body>
      </ListItem>
      <ListItem onPress={() => Linking.openURL(props.event.link)}>
        <Body>
          <Text note>Website</Text>
          <Text style={{ color: "blue" }}>
            {props.event.link}
          </Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
      {props.event.contact_phone &&
        <ListItem>
          <Body>
            <Text note>Contact Phone</Text>
            <Text>
              {props.event.contact_phone}
            </Text>
          </Body>
        </ListItem>}
      <ListItem>
        <Body>
          <Text note>Categories</Text>
          <Text>
            {props.event.categories.join("\n")}
          </Text>
        </Body>
      </ListItem>
    </List>
  </Content>;

export default EventViewOneDetail;

function showImage(remoteImageUrl) {
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

function getBorough(parkids) {
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

function openMap(coords, locationName) {
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
