import React from "react";
import { AppRegistry } from "react-native";
import App from "./app/App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import eventApp from "./app/reducers";

let store = createStore(eventApp);

const NycEvents = () =>
  <Provider store={store}>
    <App />
  </Provider>;

AppRegistry.registerComponent("NycEvents", () => NycEvents);
