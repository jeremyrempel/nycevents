"use strict";

import React, { Component } from "react";
import {
  Icon,
  List,
  ListItem,
  Button,
  Input,
  Item,
  Text,
  Left,
  Right,
  Switch,
  Body
} from "native-base";

export default class EventList extends Component {
  render() {
    //const buttonState =  ? "bordered" : "outline";

    return (
      <List>
        <ListItem>
          <Body>
            <Text>Search using keyword, date or location</Text>
          </Body>
        </ListItem>
        <ListItem icon>
          <Left>
            <Icon name="ios-compass-outline" />
          </Left>
          <Body>
            <Text>Only show events near me</Text>
          </Body>
          <Right>
            <Switch
              value={this.props.searchLimitGeo}
              onValueChange={() => this.props.toggleSearchLimitGeo()}
            />
          </Right>
        </ListItem>
        {this.props.searchLimitGeo &&
          <ListItem>
            <Left>
              <Icon name="ios-return-right" />
            </Left>
            <Body>
              <Text>Distance (miles)</Text>

              <Item underline>
                <Input
                  onChangeText={t =>
                    this.props.onTextChangeSearchLimitDistance(t)}
                  value={String(this.props.searchLimitDistance)}
                  style={{ height: 40, width: 100 }}
                />
              </Item>
            </Body>
          </ListItem>}

        {/*
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
        */}
        <ListItem>
          <Body>
            <Text note>
              Displaying {this.props.currentEventsNumber} of{" "}
              {this.props.totalEventsNumber} events
            </Text>
          </Body>
        </ListItem>
      </List>
    );
  }
}
