# File Editor Part 1(https://learn.digitalcrafts.com/flex/lessons/full-stack-frameworks/multiple-reducers/#setting-up)

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