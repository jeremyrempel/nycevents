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

  onToggleCategoryLocal(catToggle) {
    const { setParams } = this.props.navigation;
    const { onToggleCategory } = this.props.navigation.state.params;
    const { categories } = this.props.navigation.state.params;

    let newCategory = categories.map(c => {
      return {
        category: c.category,
        selected: c.category == catToggle ? !c.selected : c.selected
      };
    });

    // set local params
    setParams({ categories: newCategory });

    // update global state
    onToggleCategory(catToggle);
  }

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
                ? <Text>Clear</Text>
                : <Icon name="md-arrow-round-up" />}
            </Button>
          </Right>
        </Header>
        <Content style={{ backgroundColor: "white" }}>
          <List
            dataArray={categories}
            renderRow={c =>
              <ListItem onPress={() => this.onToggleCategoryLocal(c.category)}>
                <CheckBox
                  checked={c.selected}
                  onPress={() => this.onToggleCategoryLocal(c.category)}
                />
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
