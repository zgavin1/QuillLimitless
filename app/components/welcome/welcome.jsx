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
                <br/>
                <p>
                  In these activities the goal is to tap on the underlined word that you think makes the sentence in correct.
                  Watch out, some of these are trick questions! If you suspect a question has no error you should tap on the no error button.
                  If you tap the right word, you'll be asked to type in your correction.
                </p>
              </div>
              <div className="panel-body">
                <a onClick={this.props.start.bind(null, 'testactivities1')}>Test 1</a>
                <hr/>
                  <a onClick={this.props.start.bind(null, 'testactivities2')}>Test 2</a>
                  <hr/>
                <a onClick={this.props.start.bind(null, 'bblQuestions')}>Bronx Better Learning</a>
                <hr/>
                <a onClick={this.props.start.bind(null, 'v5Questions')}>SAT PREP</a>
                <hr/>
                <a onClick={this.props.start.bind(null, 'v4Questions')}>DOE Fund</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
