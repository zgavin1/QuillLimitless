import React from "react";

import "./greeting.scss";

export default React.createClass({
	render: function() {
	  return (
	    <div className="greeting">
	      <h1 className="name">Hello Ryan, {this.props.name}!</h1>
	    </div>
	  );
	},
});
