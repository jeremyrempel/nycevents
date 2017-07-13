"use strict";

import { AppRegistry } from "react-native";
import { Header } from "native-base";
import { StackNavigator } from "react-navigation";
import EventViewOne from "./components/EventViewOne";
import HomeScreen from "./HomeScreen";
import CategorySelectScreen from "./components/CategorySelect";

const App = StackNavigator(
  {
    Home: { screen: HomeScreen },
    EventView: { screen: EventViewOne },
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
