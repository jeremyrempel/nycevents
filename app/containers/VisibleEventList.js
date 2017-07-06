"use strict";

import { connect } from "react-redux";
import EventList from "../components/EventList";

const getVisibleEvents = (events, filter) => {
  return events;
};

const mapStateToProps = state => {
  return {
    events: getVisibleEvents(state.events, state.filter)
  };
};

function toggleTodo(id) {
  console.log(id);
}

const mapDispatchToProps = dispatch => {
  return {
    onEventClick: id => {
      dispatch(toggleTodo(id));
    }
  };
};

const VisibleEventList = connect(mapStateToProps, mapDispatchToProps)(
  EventList
);

export default VisibleEventList;
