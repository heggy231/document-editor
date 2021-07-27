import {
  ADD_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  SET_SELECTED,
  SET_SEARCH
} from './actions';

export default appReducer(state, action) {
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
}