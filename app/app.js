import React from "react";
import ReactDOM from "react-dom";
import Greeting from "./greeting";
import { Router, Route, Link } from 'react-router'

import "./style.scss";

const App = React.createClass({
  render(){
    return (
      <div>
        <h1>Welcome to the App</h1>
        <Link to="/greeting">Greeting</Link>
        {this.props.children}
      </div>
    )
  }
});

const NoMatch = React.createClass({
  render(){
    return (
      <h1>404 That page doesn't exist</h1>
    )
  }
});

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="greeting" component={Greeting}/>
      <Route path="*" component={NoMatch}/>
    </Route>

  </Router>),
  document.body
);
