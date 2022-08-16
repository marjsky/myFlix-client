import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES } from '../actions/actions';

function visibilityFilter(state = '', action) {//initailize state object of string T or F pass in action
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) { //initialize state object of empty array pass in action
  switch (action.type) {
    case SET_MOVIES:
      console.log('SET_MOVIES reducer reached');
      return action.value;
    default:
      return state;
  }
}

// combined reducers functionality from Redux helps us into one reducer use anywhere else in app.
const moviesApp = combineReducers({
    visibilityFilter,
    movies
});

export default moviesApp;