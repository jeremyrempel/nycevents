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

class HomeScreen extends React.Component {
  static navigationOptions = { header: null };

  render() {
    const { navigate } = this.props.navigation;

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
          <EventList
            onPress={() => navigate("EventView", { name: "NYC Pride Week" })}
          />
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
