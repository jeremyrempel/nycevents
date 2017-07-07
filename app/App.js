"use strict";

import { AppRegistry } from "react-native";
import { Header } from "native-base";
import { StackNavigator } from "react-navigation";
import EventViewScreen from "./components/EventViewScreen";
import HomeScreen from "./HomeScreen";
import CategorySelectScreen from "./components/CategorySelect";

const App = StackNavigator(
  {
    Home: { screen: HomeScreen },
    EventView: { screen: EventViewScreen },
    CategorySelect: { screen: CategorySelectScreen }
  },
  {
    initialRouteName: "Home",
    headerMode: "screen",
    headerComponent: Header
  }
);
export default App;

AppRegistry.registerComponent("NycEvents", () => App);
