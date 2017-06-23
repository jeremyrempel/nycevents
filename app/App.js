import React from "react";
import { AppRegistry, ActivityIndicator } from "react-native";
import {
  Container,
  Title,
  Header,
  Icon,
  Button,
  Left,
  Right,
  Body
} from "native-base";
import { StackNavigator } from "react-navigation";
import EventList from "./EventList";
import EventViewScreen from "./EventViewScreen";

class HomeScreen extends React.Component {
  static navigationOptions = { header: null };

  constructor() {
    super();

    this.state = {
      isLoading: true,
      events: []
    };

    this.rowSelect = this.rowSelect.bind(this);
  }

  componentDidMount() {
    return fetch("https://www.nycgovparks.org/xml/events_300_rss.json")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          events: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  rowSelect(selectedEvent) {
    const { navigate } = this.props.navigation;
    navigate("EventView", { event: selectedEvent });
  }

  render() {
    let listView;
    if (this.state.isLoading) {
      listView = <ActivityIndicator size="large" style={{ paddingTop: 150 }} />;
    } else {
      listView = (
        <EventList events={this.state.events} onPress={this.rowSelect} />
      );
    }

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
        {listView}
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
