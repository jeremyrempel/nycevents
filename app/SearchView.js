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
            <Switch value={this.props.searchLimitGeo} />
          </Right>
        </ListItem>
        {this.props.searchLimitGeo &&
          <ListItem>
            <Left>
              <Icon name="ios-return-right" />
            </Left>
            <Body>
              <Text>Search Radius (miles)</Text>
            </Body>
            <Right>
              <Item underline>
                <Input
                  placeholder="Regular Textbox"
                  value={String(this.props.searchLimitDistance)}
                  style={{ height: 30 }}
                />
              </Item>
            </Right>
          </ListItem>}
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
