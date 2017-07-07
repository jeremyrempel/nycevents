"use strict";

import { Platform } from "react-native";
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
  CheckBox
} from "native-base";

export default class CategorySelect extends React.Component {
  static navigationOptions = { header: null };

  render() {
    const { goBack } = this.props.navigation;
    const { categories } = this.props.navigation.state.params;
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => goBack()} transparent>
              <Icon ios="ios-arrow-back" android="md-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Select Categories</Title>
          </Body>
          <Right>
            <Button transparent>
              {Platform.OS === "ios"
                ? <Text>Select All</Text>
                : <Icon name="md-arrow-round-up" />}
            </Button>
          </Right>
        </Header>
        <Content style={{ backgroundColor: "white" }}>
          <List
            dataArray={categories}
            renderRow={c =>
              <ListItem>
                <CheckBox checked={c.selected} />
                <Body>
                  <Text>
                    {c.category}
                  </Text>
                </Body>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}
