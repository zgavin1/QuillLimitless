import React from "react";

export default React.createClass({
  render: function () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Welcome to Quill Limitless</h3>
              </div>
              <div className="panel-body">
                <a onClick={this.props.action}>SAT PREP</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
