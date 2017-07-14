"use strict";

import React from "react";
import {
  Icon,
  List,
  ListItem,
  Input,
  Item,
  Text,
  Left,
  Right,
  Switch,
  Body
} from "native-base";

const SearchView = props =>
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
          value={props.searchLimitGeo}
          onValueChange={() => props.toggleSearchLimitGeo()}
        />
      </Right>
    </ListItem>
    {props.searchLimitGeo &&
      <ListItem>
        <Left>
          <Icon name="ios-return-right" />
        </Left>
        <Body>
          <Text>Distance (miles)</Text>
          <Item underline>
            <Input
              onChangeText={t => props.onTextChangeSearchLimitDistance(t)}
              value={String(props.searchLimitDistance)}
              style={{ height: 40, width: 100 }}
            />
          </Item>
        </Body>
      </ListItem>}
    <ListItem icon onPress={() => props.onSelectCategories()}>
      <Left>
        <Icon name="ios-funnel-outline" />
      </Left>
      <Body>
        <Text>Categories</Text>
      </Body>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
    {/*
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
          Displaying {props.currentEventsNumber} of {props.totalEventsNumber}{" "}
          events
        </Text>
      </Body>
    </ListItem>
  </List>;

export default SearchView;
