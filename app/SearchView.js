"use strict";

import React, { Component } from "react";
import {
  Icon,
  List,
  ListItem,
  Switch,
  Input,
  Item,
  Text,
  Left,
  Right,
  Body
} from "native-base";

export default class EventList extends Component {
  render() {
    return (
      <List>
        <ListItem itemHeader first>
          <Text>SEARCH OPTIONS</Text>
        </ListItem>
        <ListItem icon>
          <Left>
            <Icon name="ios-compass-outline" />
          </Left>
          <Body>
            <Text>Limit to events close to me</Text>
          </Body>
          <Right>
            <Switch value={true} />
          </Right>
        </ListItem>
        <ListItem>
          <Left>
            <Icon name="ios-return-right" />
          </Left>
          <Body>
            <Text>Distance (miles)</Text>
          </Body>
          <Right>
            <Item underline>
              <Input
                placeholder="Regular Textbox"
                value="3"
                style={{ height: 30 }}
              />
            </Item>
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Icon name="ios-funnel-outline" />
          </Left>
          <Body>
            <Text>Categories</Text>
          </Body>
          <Right>
            <Text>ALL</Text>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <ListItem icon>
          <Left>
            <Icon name="ios-funnel-outline" />
          </Left>
          <Body>
            <Text>Boroughs</Text>
          </Body>
          <Right>
            <Text>ALL</Text>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
      </List>
    );
  }
}
