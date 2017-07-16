"use strict";

import React from "react";
import {
  Icon,
  List,
  ListItem,
  Text,
  Right,
  Button,
  H1,
  Body,
  Content
} from "native-base";
import { Linking, Platform, Image, View, Alert } from "react-native";
import RNCalendarEvents from "react-native-calendar-events";

const EventViewOneDetail = props =>
  <Content style={{ backgroundColor: "white" }}>
    {props.event.image.length > 0 &&
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          style={{
            width: 450,
            height: 300
          }}
          source={{ uri: props.event.image.replace("http", "https") }}
        />
      </View>}

    <Button
      iconLeft
      info
      full
      onPress={() => {
        Alert.alert("Calendar", `Add ${props.event.title} to your calendar?`, [
          {
            text: "Ok",
            onPress: () => addEventToCalendar(props.event)
          },
          {
            text: "Cancel",
            style: "cancel"
          }
        ]);
      }}
    >
      <Icon name="ios-calendar-outline" />
      <Text>Add to Calendar</Text>
    </Button>

    <List>
      <ListItem>
        <H1>
          {props.event.title}
        </H1>
      </ListItem>
      <ListItem>
        <Body>
          <Text>
            {props.event.description}
          </Text>
        </Body>
      </ListItem>
      <ListItem
        onPress={() => openMap(props.event.coordinates, props.event.location)}
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
      locationName +
      " New York";
    Linking.openURL(andGMap);
  }
}

async function addEventToCalendar(event) {
  let status = null;
  try {
    // request calendar access
    status = await RNCalendarEvents.authorizeEventStore();
  } catch (err) {
    Alert.alert(err);
  }

  if (status == "authorized") {
    const endDateTime =
      new Date(event.endDateTime).getTime() < new Date(event.startDateTime)
        ? event.startDateTime
        : event.endDateTime;
    try {
      await RNCalendarEvents.saveEvent(event.title, {
        location: event.location,
        notes: event.description + "\n" + event.link,
        startDate: event.startDateTime,
        endDate: endDateTime,
        alarms: [
          {
            date: -60,
            structuredLocation: {
              title: event.title,
              proximity: "enter",
              coords: event.coords
            }
          }
        ]
      });
    } catch (err) {
      Alert.alert(err);
    }
  } else {
    Alert.alert(
      "App cannot access your calendar to add the event. You can grant access in the settings."
    );
  }
}
