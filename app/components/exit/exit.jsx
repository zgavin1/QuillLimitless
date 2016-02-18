import React from "react";
import Results from "../results/results.jsx";

export default React.createClass({
  render: function () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h3 className="panel-title">Congratulations!</h3>
            <Results data={this.props} dispatch={this.props.dispatch}/>
          </div>
        </div>
      </div>
    )
  }
});
