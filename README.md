# [File Editor Part 1](https://learn.digitalcrafts.com/flex/lessons/full-stack-frameworks/multiple-reducers/#setting-up)

- create js files actions, reducers, store

* The workflow Redux:

  1. Define the default/example state

  2. Write Actions that describe how that state can change.

  3. Write a Reducer that expects to receive the state and an action, and returns a modified copy of the state.

### 1. Define the state:
  * Array of documents
  * ID of the selected doc
  * Text to search for

### 2. List of Actions:

  * add a document
  * delete a document
  * update a document
  * set the selected document ID
  * set the search text

- install uuid npm package to generate unique IDs for add new documents
> https://www.npmjs.com/package/uuid

```js

// inside reducers.js)
import {
  ADD_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  SET_SELECTED,
  SET_SEARCH
} from './actions';

const appReducer = (state, action) => {
  switch (action.type) {
    case ADD_DOCUMENT:
      return {
        ...state, // cp state, overwriting documents
        documents: [
          // Copy of existing documents + new document
        ]
      }
    case DELETE_DOCUMENT:
      return {
        ...state, // cp state, overwriting documents
        documents: [
          // Copy of existing documents - one to delete
        ]
      }
    case UPDATE_DOCUMENT:
      return {
        ...state, // cp state, overwriting documents
        documents: [
          // Copy of existing documents, modifying matching doc
        ]
      }
    case SET_SELECTED:
      return {
        ...state, // cp state, overwriting selected ID
        selected: action.payload.id
      }
    case SET_SEARCH:
      return {
        ...state, // cp state, overwriting search text
        search: action.payload.text
      }
    default:
      return state;
  }
};

export default appReducer;

// ****** refactor to have 
//  three simpler reducers
//  1. documents() manages the documents slice
//  2. selected() manages selected slice
//  3. search() manages search slice
```