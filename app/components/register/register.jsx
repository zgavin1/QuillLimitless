import React from 'react';
import RadioGroup from 'react-radio-group';
import Firebase from 'firebase';
import {registered} from '../../actions'

export default React.createClass({
  getInitialState: function () {
    return {
      englishLanguage: 'first',
      educationLevel: 'elementary'
    }
  },

  handleEductaionLevelChange: function (value) {
    this.setState({
      educationLevel: value,
    });
  },

  handleEnglishLanguageChange: function (value) {
    this.setState({
      englishLanguage: value,
    });
  },

  process: function (e) {
    e.preventDefault();
    var data = this.state;
    data.name = this.refs.name.value
    const ref = new Firebase("https://limitless.firebaseio.com/users")
    var userDetails = ref.push(data, () => {
      userDetails.on('value', (dataSnapshot) => {
        console.log(dataSnapshot.val())
        console.log(dataSnapshot.ref().toString())
        data.ref = dataSnapshot.ref().toString()
        const action = registered(data)
        this.props.dispatch(action)
      });
    })
  },

  render: function () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <h2>Welcome to Quill</h2>
            <p>Let's get to know you a little better. This data will help us improve your
              experience as well as others.
            </p>
            <form>
              <div className="form-group">
                <label htmlFor="inputEmail3" >What is your name</label>
                <input type="email" className="form-control" ref="name" placeholder="Name" />
              </div>
              <RadioGroup
                name="englishLanguage"
                selectedValue={this.state.englishLanguage}
                onChange={this.handleEnglishLanguageChange}>
                {Radio => (
                  <div className="form-group">
                    <label>Are you a Native English Speaker or is English your second language?</label>
                    <br/>
                    <label className="radio-inline">
                      <Radio value="first" />First Language
                    </label>
                    <label className="radio-inline">
                      <Radio value="second" />Second Language
                    </label>
                  </div>
                )}
              </RadioGroup>
              <RadioGroup
                name="educationLevel"
                selectedValue={this.state.educationLevel}
                onChange={this.handleEductaionLevelChange}>
                {Radio => (
                  <div className="form-group">
                    <label>What is the highest level of education you have achieved?</label>
                    <br/>
                    <label className="radio-inline">
                      <Radio value="elementary" />Elementary
                    </label>
                    <label className="radio-inline">
                      <Radio value="middle" />Middle
                    </label>
                    <label className="radio-inline">
                      <Radio value="high" />High School
                    </label>
                    <label className="radio-inline">
                      <Radio value="college" />College
                    </label>
                  </div>
                )}
              </RadioGroup>
              <div className="form-group">
                <button type="submit" onClick={this.process} className="btn btn-default">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
})
