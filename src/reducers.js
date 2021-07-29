// Combine Reducers, step 1: get combine reducers function from redux
import { combineReducers } from "redux";
import {
  ADD_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  SET_SELECTED,
  SET_SEARCH,
} from "./actions";

function documents(state = [], action) {
  // note all reducers fx has `param` `action` passed in as a second argument 
  //  reducers works together with action creator
  //  functions in `actions.js`.
  switch (action.type) {
    case ADD_DOCUMENT:
      return [
        ...state, // copy (slice of) state passed in, particularly for slice that this reducer is responsible for.
        action.payload,  // looking back at my action creator action.type: ADD_DOCUMENT, action.payload obj include id, title, content.
      ];
    case DELETE_DOCUMENT:
      // copy of state Array, filtering out if doc ID matches and keeps everything else.  which in turn deletes doc.id that passed in.
      return state.filter((doc) => doc.id !== action.payload.id);
    case UPDATE_DOCUMENT:
      // copy of state Array, altering the single doc whose ID is in the payload
      return state.map((doc) =>
        doc.id !== action.payload.id ? doc : { ...action.payload }
      );
  }
  return state;  // always return state as-it-is for catch all cases
}

function selected(state = "", action) {
  // action that returns the value from the payload
  //  when they are responsible for handling.
  switch (action.type) {
    case SET_SELECTED:
      return action.payload.id;
  }
  return state;
}

function search(state='', action) {
  // action (refer to setSearch action creator) that returns the value from the payload
  //  when they are responsible for handling.
  switch(action.type) {
    case SET_SEARCH:
      return action.payload.text;
  }
  return state;
}

// Combine Reducers into one: step 2: call combineReducers(), pass Obj, Key (slice of state): Value (name of Reducer function)
// I created 3 reducer functions (inside this reducers.js file): 1. documents, 2. selected, 3. search.  Here I am assigning these functions inside of Obj and passing it inside of combineReducers()
export const rootReducer = combineReducers({
  documents, // this is shorthand syntax for `documents: documents`
  selected,
  search,
});