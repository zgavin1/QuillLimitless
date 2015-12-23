import React from "react";

export default React.createClass({
  updateScore: function(){
    this.props.action("INCREMENT")
  },

  render: function () {
    return (
      <div>
        <h2>Question</h2>
        <p onClick={this.updateScore}>{this.props.data}</p>
      </div>
    )
  }
})
