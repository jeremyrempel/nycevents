import React from "react";
import { AppRegistry } from "react-native";
import {
  Container,
  Title,
  Header,
  Content,
  Icon,
  Button,
  Left,
  Right,
  Body
} from "native-base";
import { StackNavigator } from "react-navigation";
import EventList from "./EventList";
import EventViewScreen from "./EventViewScreen";

const events = require("./data/events_300_rss.json");

class HomeScreen extends React.Component {
  static navigationOptions = { header: null };

  constructor() {
    super();

    this.rowSelect = this.rowSelect.bind(this);
  }

  rowSelect(selectedEvent) {
    const { navigate } = this.props.navigation;

    navigate("EventView", { event: selectedEvent });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon ios="ios-menu" android="md-menu" />
            </Button>
          </Left>
          <Body>
            <Title>Near Me</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ backgroundColor: "white" }}>
          <EventList events={events} onPress={this.rowSelect} />
        </Content>
      </Container>
    );
  }
}

const App = StackNavigator(
  {
    Home: { screen: HomeScreen },
    EventView: { screen: EventViewScreen }
  },
  {
    initialRouteName: "Home",
    headerMode: "screen",
    headerComponent: Header
  }
);
export default App;

AppRegistry.registerComponent("NycEvents", () => App);
