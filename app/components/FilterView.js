"use strict";

import React, { Component } from "react";
import { StyleSheet } from "react-native";
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
  Header,
  Button,
  Title,
  Body,
  Picker,
  Container,
  Content,
  Form,
  Grid,
  Col,
  H3
} from "native-base";

export default class FilterView extends Component {

  static navigationOptions = { header: null };

  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined
    };
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

  render() {
    return (

      <Container>

        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Select Filter</Title>
          </Body>
          <Right />
        </Header>

        <Content>

          <ListItem icon>
            <Left>
              <Icon name="ios-compass-outline" />
            </Left>
            <Body>
              <Text>Borough</Text>
            </Body>
          </ListItem>



          <Grid>
            <Col style={styles.button}>
              <Button full info><Text>Manhattan</Text></Button>
            </Col>
            <Col style={styles.button}>
              <Button full info><Text>Brooklyn</Text></Button>
            </Col>
            <Col style={styles.button}>
              <Button full info><Text>Bronx</Text></Button>
            </Col>
          </Grid>
          <Grid>
            <Col style={styles.button}>
              <Button full info><Text>Queens</Text></Button>
            </Col>
            <Col style={styles.button}>
              <Button full info><Text>Staten Island</Text></Button>
            </Col>
          </Grid>

          <Form>
            <Picker
              mode="dropdown"
              placeholder="Select One"
              selectedValue="Wallet"
              onValueChange={this.onValueChange2.bind(this)}
            >
              <Item label="Wallet" value="key0" />
              <Item label="ATM Card" value="key1" />
              <Item label="Debit Card" value="key2" />
              <Item label="Credit Card" value="key3" />
              <Item label="Net Banking" value="key4" />
            </Picker>
          </Form>

        </Content>
      </Container>);
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 2
  }
});
