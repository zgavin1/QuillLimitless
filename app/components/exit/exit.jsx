import React from "react";

export default React.createClass({
  render: function () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Congratulations</h3>
              </div>
              <div className="panel-body">
                <p>That's all folks!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
