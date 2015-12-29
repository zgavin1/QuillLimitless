import React from "react";
import { render } from 'react-dom'
import Root from "./components/root";
import createStore from './utils/configureStore';
import { Provider } from 'react-redux';
import findAndFix from './reducers/combined';
import DevTools from './utils/devTools';

let store = createStore();
console.log(store);
console.log(store.getState());

render((
  <Provider store={store}>
    <Root />
  </Provider>),
  document.getElementById("root")
);
