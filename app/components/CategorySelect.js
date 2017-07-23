"use strict";

import { Platform } from "react-native";
import React, { Component } from "react";
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

export default class CategorySelect extends Component {
  static navigationOptions = { header: null };

  constructor(props) {
    super(props);

    this.state = {
      categories: this.props.navigation.state.params.categories
    };
  }

  onToggleCategoryLocal(catToggle) {
    const newCategory = this.state.categories.map(c => {
      return {
        category: c.category,
        selected: c.category == catToggle ? !c.selected : c.selected
      };
    });

    this.setState({
      categories: newCategory
    });
  }

  goBack() {
    const { onToggleCategory } = this.props.navigation.state.params;
    const { goBack } = this.props.navigation;

    let selectCategories = this.state.categories.reduce((acc, cur) => {
      if (cur.selected) {
        acc.push(cur.category);
      }
      return acc;
    }, []);

    selectCategories = selectCategories ? selectCategories : [];

    onToggleCategory(selectCategories);
    goBack();
  }

  render() {
    const { categories } = this.state;

    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => this.goBack()} transparent>
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
