import { createStore } from 'redux';
import { rootReducer } from './reducers';

const defaultState = {
  documents: [],
  selected: '',
  search: ''
}

// call createStore() fx, pass defaultState along with rootReducer, export it.
const store = createStore(
  rootReducer,
  defaultState
);

export default store;