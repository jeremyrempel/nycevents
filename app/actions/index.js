"use strict";

const UPDATE_SEARCH_TEXT = "UPDATE_SEARCH_TEXT";
const SET_ADVANCED_SEARCH_VISIBILITY = "SET_ADVANCED_SEARCH_VISIBILITY";

export const updateSearchText = text => {
  return {
    type: UPDATE_SEARCH_TEXT,
    text
  };
};

export const setAdvancedSearchVisibilty = () => {
  return {
    type: SET_ADVANCED_SEARCH_VISIBILITY
  };
};
