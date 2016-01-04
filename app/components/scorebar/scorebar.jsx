import React from "react";

export default React.createClass({
  render: function () {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">
              <span>{"GrammarStack Score:" + this.props.score.score}</span>
            </a>
          </div>
        </div>
      </nav>
    )
  }
})
