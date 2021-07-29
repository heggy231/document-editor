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

function documents(state = [], action) {
  switch (action.type) {
    case ADD_DOCUMENT:
      return [
        ...state, // copy (slice of) state passed in
        action.payload,
      ];
    case DELETE_DOCUMENT:
      // copy of state Array, filtering out doc ID is in payload
      return state.filter((doc) => doc.id !== action.payload.id);
    case UPDATE_DOCUMENT:
      // copy of state Array, altering the single doc whose ID is in the payload
      return state.map((doc) =>
        doc.id !== action.payload.id ? doc : { ...action.payload }
      );
  }
  return state;
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

function search() {
  // action that returns the value from the payload
  //  when they are responsible for handling.
  switch(action.type) {
    case SET_SEARCH:
      return action.payload.text;
  }
  return state;
}
```

- Combine 3 simpler reducers

```jsx
// Combine Reducers, step 1: get combine reducers function from redux
import { combineReducers } from "redux";

// Combine Reducers, step 2: call combineReducers(), pass Obj, Key (slice of state): Value (name of Reducer function)
// as you see above I created 3 reducer functions: 1. documents, 2. selected, 3. search.  Here I am assigning these functions inside of Obje and passing it inside of combineReducers()
export const rootReducer = combineReducers({
  documents,
  selected,
  search,
});
```

### Creating the Redux Store:
- once the reducers are combined, we can create the store!

* import my reducers into the store and name it rootReducer,
* import createStore to implement the store.


#### how do my `actionCreator` functions come over to `reducer.js`?

```js
function documents(state = [], action) {
  switch (action.type) {
    case ADD_DOCUMENT:
      return [
        ...state, // copy (slice of) state passed in
        action.payload,
      ];
    case DELETE_DOCUMENT:
      // copy of state Array, filtering out doc ID is in payload
      return state.filter((doc) => doc.id !== action.payload.id);
    case UPDATE_DOCUMENT:
      // copy of state Array, altering the single doc whose ID is in the payload
      return state.map((doc) =>
        doc.id !== action.payload.id ? doc : { ...action.payload }
      );
  }
  return state;
}
```
* Let's look at `case DELETE_DOCUMENT`:

  - Where does `doc.id !== action.payload.id`'s `action.payload.id` comes from?  
    * my action creator function gets passed in as a param: `action`.  This is the key where all the payload obj key:value pairs are passed in.
    
    * case1) 
    ```js
    // inside of `actions.js`)
    export function addDocument(title, content) {
      return {
        type: ADD_DOCUMENT,
        payload: {
          id: uuidv4(), // Generate a unique id
          title,
          content,
        },
      };
    }

    // inside of reducers.js)
    function documents(state = [], action) {
      switch (action.type) {
        case ADD_DOCUMENT:
          return [
            ...state, // copy (slice of) state passed in, particularly for slice that this reducer is responsible for.
            action.payload,  // looking back at my action creator action.type: ADD_DOCUMENT, action.payload obj include id, title, content.
          ];
    ```