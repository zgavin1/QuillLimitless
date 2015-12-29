import React from "react";
import { render } from 'react-dom'
import Root from "./components/root";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import findAndFix from './reducers/combined';

let store = createStore(findAndFix);
console.log(store);
console.log(store.getState());

render((
  <Provider store={store}>
    <Root />
  </Provider>),
  document.getElementById("root")
);
