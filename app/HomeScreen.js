import React from "react";
import { ActivityIndicator } from "react-native";
import {
  Container,
  Header,
  Icon,
  Button,
  Text,
  Left,
  Right,
  Body,
  Title
} from "native-base";
import EventList from "./EventList";

const dataSource = "https://www.nycgovparks.org/xml/events_300_rss.json";

export default class HomeScreen extends React.Component {
  static navigationOptions = { header: null };

  constructor() {
    super();

    this.state = {
      isLoading: true,
      events: [],
      error: null
    };

    this.rowSelect = this.rowSelect.bind(this);
  }

  componentDidMount() {
    return fetch(dataSource)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          events: responseJson
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          error: error,
          text: null
        });
        console.error(error);
      });
  }

  rowSelect(selectedEvent) {
    const { navigate } = this.props.navigation;
    navigate("EventView", { event: selectedEvent });
  }

  render() {
    let listView;
    if (this.state.error) {
      listView = <Text>Error loading event data</Text>;
    }
    if (this.state.isLoading) {
      listView = <ActivityIndicator size="large" style={{ paddingTop: 150 }} />;
    } else {
      listView = (
        <EventList events={this.state.events} onPress={this.rowSelect} />
      );
    }

    return (
      <Container>

        <Header searchBar rounded>
          <Left>
            <Button transparent>
              <Icon
                ios="ios-menu"
                android="md-menu"
                onPress={() => {
                  this.drawer._root.open();
                }}
              />
            </Button>
          </Left>

          <Body>
            <Title>Near Me</Title>
          </Body>

          <Right>
            <Button transparent>
              <Icon ios="ios-search" android="md-search" />
            </Button>
          </Right>

        </Header>
        {listView}
      </Container>
    );
  }
}
