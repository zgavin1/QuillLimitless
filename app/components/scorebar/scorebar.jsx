import React from "react";

export default React.createClass({
  render: function () {
    return (
      <div>
        <h2>Scorebar ({this.props.score})</h2>
        <p>How high can you go?</p>
      </div>
    )
  }
})