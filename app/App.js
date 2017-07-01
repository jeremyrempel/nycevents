"use strict";

import { AppRegistry } from "react-native";
import { Header } from "native-base";
import { StackNavigator } from "react-navigation";
import EventViewScreen from "./EventViewScreen";
import HomeScreen from "./HomeScreen";

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
