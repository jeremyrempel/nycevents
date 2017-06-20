/**
 * Created by jrempel on 6/14/17.
 */
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
  Right,
  Icon
} from "native-base";
import { Linking, Image } from "react-native";

export default class EventViewScreen extends React.Component {
  static navigationOptions = { header: null };

  render() {
    const { goBack } = this.props.navigation;

    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => goBack()} transparent>
              <Icon ios="ios-arrow-back" android="md-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Pride Week</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ backgroundColor: "white" }}>
          <Image
            source={require("./img/event/pride.jpg")}
            style={{ height: 200 }}
          />
          <ListItem>
            <Body>
              <Text>
                LGBT Pride is an annual event which began in New York in 1970 on
                the first anniversary of the Stonewall Uprising. Heritage of
                Pride works toward a future without discrimination where all
                people have equal rights under the law. We do this by producing
                LGBT Pride events that inspire, educate, commemorate and
                celebrate our diverse community.
              </Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text note>Date, Time</Text>
              <Text>June 18, All Day</Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text note>Address</Text>
              <Text>Check website for event details</Text>
            </Body>
          </ListItem>
          <ListItem onPress={() => Linking.openURL("http://www.nycpride.org")}>
            <Body>
              <Text note>Website</Text>
              <Text style={{ color: "blue" }}>nycpride.org</Text>
            </Body>
            <Right><Icon name="arrow-forward" /></Right>
          </ListItem>
          <ListItem>
            <Body>
              <Text note>Contact Name</Text>
              <Text>Heritage of Pride</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}
