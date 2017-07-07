"use strict";

/**
 * Created by jrempel on 6/14/17.
 */
import React from "react";
import {
  Separator,
  Content,
  List,
  ListItem,
  Text,
  Body,
  Thumbnail,
  Right,
  Icon
} from "native-base";

let dates = [];

const EventList = props =>
  <List
    style={{ backgroundColor: "white" }}
    dataArray={props.events}
    renderRow={item =>
      <Content>
        {showHeader(item.startdate) &&
          <Separator bordered>
            <Text>
              {item.startdate}
            </Text>
          </Separator>}

        <ListItem onPress={() => props.onPress(item)}>
          {showImage(item.image)}
          <Body>
            <Text>
              {item.title}
            </Text>
            <Text note>
              {item.startdate} {item.starttime}
            </Text>
            <Text note>
              {item.location}
            </Text>
            <Text note>
              {item.categories.join(", ")}
            </Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      </Content>}
  />;

export default EventList;

function showImage(remoteImageUrl) {
  if (remoteImageUrl && remoteImageUrl.length > 0) {
    return (
      <Thumbnail
        large
        source={{ uri: remoteImageUrl.replace("http", "https") }}
      />
    );
  } else {
    return <Thumbnail large source={require("../img/park.png")} />;
  }
}

function showHeader(date) {
  if (dates.indexOf(date) > -1) {
    return false;
  } else {
    dates.push(date);
    return true;
  }
}
