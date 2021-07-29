// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import store from './store';
// importing all action Creators functions from `actions.js`
import {
  addDocument,
  updateDocument,
  delDocument,
  setSelected,
  setSearch
} from './actions';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// attach store, actions as props to `window` obj so that I could play around in console
window.store = store;
window.addDocument = addDocument;
window.updateDocument = updateDocument;
window.delDocument = delDocument;
window.setSelected = setSelected;
window.setSearch = setSearch;

