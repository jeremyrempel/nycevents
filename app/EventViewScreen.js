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
  Icon,
  H1
} from "native-base";
import { Linking, Image } from "react-native";

export default class EventViewScreen extends React.Component {
  static navigationOptions = { header: null };

  render() {
    const { goBack } = this.props.navigation;
    const { event } = this.props.navigation.state.params;

    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => goBack()} transparent>
              <Icon ios="ios-arrow-back" android="md-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{event.title}</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ backgroundColor: "white" }}>
          {this.showImage(event.image)}
          <ListItem>
            <H1>{event.title}</H1>
          </ListItem>
          <ListItem>
            <Body>
              <Text>
                {event.description
                  .replace("</p>", "\n")
                  .replace(/<(?:.|\n)*?>/gm, "")}
              </Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text note>Date, Time</Text>
              <Text>{event.startdate} @ {event.starttime}y</Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text note>Address</Text>
              <Text>Check website for event details</Text>
            </Body>
          </ListItem>
          <ListItem onPress={() => Linking.openURL(event.link)}>
            <Body>
              <Text note>Website</Text>
              <Text style={{ color: "blue" }}>{event.link}</Text>
            </Body>
            <Right><Icon name="arrow-forward" /></Right>
          </ListItem>
          <ListItem>
            <Body>
              <Text note>Contact Phone</Text>
              <Text>{event.contact_phone}</Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text note>Categories</Text>
              <Text>{event.categories}</Text>
            </Body>
          </ListItem>

        </Content>
      </Container>
    );
  }

  showImage(remoteImageUrl) {
    if (remoteImageUrl.length > 0) {
      return (
        <Image
          style={{
            width: 400,
            height: 300,
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
          source={{ uri: remoteImageUrl.replace("http", "https") }}
        />
      );
    }
  }
}
