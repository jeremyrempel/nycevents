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
              <Text note>Location</Text>
              <Text>{event.location}</Text>
            </Body>
          </ListItem>

          {event.parkids.length > 0 &&
            <ListItem>
              <Body>
                <Text note>Borough</Text>
                <Text>
                  {this.getBorough(event.parkids)}
                </Text>
              </Body>
            </ListItem>}
          <ListItem>
            <Body>
              <Text note>Date</Text>
              <Text>
                {event.startdate}
              </Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text note>Time</Text>
              <Text>
                {event.starttime}-{event.endtime}
              </Text>
            </Body>
          </ListItem>
          <ListItem onPress={() => Linking.openURL(event.link)}>
            <Body>
              <Text note>Website</Text>
              <Text style={{ color: "blue" }}>{event.link}</Text>
            </Body>
            <Right><Icon name="arrow-forward" /></Right>
          </ListItem>
          {event.contact_phone &&
            <ListItem>
              <Body>
                <Text note>Contact Phone</Text>
                <Text>{event.contact_phone}</Text>
              </Body>
            </ListItem>}
          <ListItem>
            <Body>
              <Text note>Categories</Text>
              <Text>{event.categories}</Text>
            </Body>
          </ListItem>
          <ListItem>
            <Body>
              <Text note>Coordinates</Text>
              <Text>{event.coordinates}</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }

  getBorough(parkids) {
    let bCode = parkids.substring(0, 1);

    switch (bCode) {
      case "B":
        return "Brooklyn";
      case "M":
        return "Manhattan";
      case "X":
        return "Bronx";
      case "Q":
        return "Queens";
      case "R":
        return "Staten Island";
    }
  }

  showImage(remoteImageUrl) {
    if (remoteImageUrl.length > 0) {
      return (
        <Image
          style={{
            width: 400,
            height: 200,
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center",
            alignItems: "center"
          }}
          source={{ uri: remoteImageUrl.replace("http", "https") }}
        />
      );
    }
  }
}
