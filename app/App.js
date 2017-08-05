"use strict";

import { AppRegistry } from "react-native";
import { Header } from "native-base";
import { StackNavigator } from "react-navigation";
import EventViewOne from "./components/EventViewOne";
import HomeScreen from "./HomeScreen";
import CategorySelectScreen from "./components/CategorySelect";
import FilterView from "./components/FilterView";


// const App = StackNavigator(
//   {
//     Home: { screen: HomeScreen },
//     EventView: { screen: EventViewOne },
//     CategorySelect: { screen: CategorySelectScreen },
//     FilterView: { screen: FilterView,  },
//   },
//   {
//     initialRouteName: "Home",
//     headerMode: "screen",
//     headerComponent: Header
//   }
// );


const MainCardNavigator = StackNavigator(
  {
    Home: { screen: HomeScreen },
    EventView: { screen: EventViewOne },
    CategorySelect: { screen: CategorySelectScreen }
  },
  {
    headerMode: 'none',
  },
);

const App = StackNavigator(
  {
    MainCardNavigator: { screen: MainCardNavigator },
    FilterView: { screen: FilterView }
  },
  {
    mode: 'modal'
  },
);

export default App;

AppRegistry.registerComponent("NycEvents", () => App);
