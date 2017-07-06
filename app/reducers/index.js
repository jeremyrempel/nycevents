import { combineReducers } from "redux";
import events from "./events";
import visibilityFilter from "./visibilityFilter";

const todoApp = combineReducers({
  events,
  visibilityFilter
});

export default todoApp;
