import React from 'react'
import _ from "underscore"
import Firebase from "firebase"
import {exitToHome} from "../../actions"

export default React.createClass({
  componentDidMount: function () {
    this.saveResults();
  },

  generateConceptResults: function() {
    const results = this.props.data.results.map((res) => {
      var obj = {};
      obj.conceptName = res.concept.conceptName;
      obj.concept_uid = res.concept.uid;
      obj.metadata = {};
      obj.metadata.total = 1
      if (res.found === true) {
        obj.metadata.correct = 1
      } else {
        obj.metadata.correct = 0
      }
      if (res.fixed === true) {
        obj.metadata.correct += 1
      }
      if (res.needsFixing !== undefined) {
        obj.metadata.total += 1
      }
      return obj
    })
    return results;
  },

  generatePercentage: function() {
    let count = (this.props.data.results.filter((res) => {return res.needsFixing}).length * 2) + (this.props.data.results.filter((res) => {return res.needsFixing === undefined}).length);
    let correct = (this.props.data.results.filter((res) => {return res.found}).length) + (this.props.data.results.filter((res) => {return res.needsFixing && res.fixed}).length)
    return Math.floor((correct / count) * 100) + '%'
  },

  generateUpdateParams: function() {
    const params = {
      state: "finished",
      concept_results: this.generateConceptResults(),
      percentage: this.generatePercentage()
    }
    return params
  },

  rowBuilder: function() {
    return this.parseParams().map((row) => {
      return (
        <tr>
          <td>{row.name}</td>
          <td>{row.correct}/{row.total}</td>
        </tr>
      );
    });
  },

  conceptsToRows: function() {
    return (
      <div className='text-center table-responsive'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>Concept</th>
              <th>Score</th>
            </tr>
            {this.rowBuilder()}
          </thead>
        </table>
      </div>
    );
  },

  parseParams: function() {
    const params = this.generateUpdateParams();
    var results = {}
    var concepts = params.concept_results.map((p) => {
      if (results[p.concept_uid] !== undefined) {
        results[p.concept_uid].correct += p.metadata.correct,
        results[p.concept_uid].total += p.metadata.total
      } else {
        results[p.concept_uid] = {
          name: p.conceptName,
          uid: p.concept_uid,
          correct: p.metadata.correct,
          total: p.metadata.total
        }
      }
    });
    console.log(results);
    var arr = Object.keys(results).map(function(key) {
      return results[key]
    });
    return arr
  },

  returnButton: function() {
    return (
      <button type='button' className='btn btn-action' onClick={this.exit}>Return to Homepage</button>
    );
  },

  exit: function() {
    this.props.dispatch(exitToHome());
  },

  saveResults: function() {
    const ref = new Firebase(this.props.data.user.ref + "/results/" + this.props.data.questionSet);
    ref.set(this.props.data.results)
  },

  render: function() {
    return (
      <div>
      <h3>{this.generatePercentage()} Correct</h3>
      {this.conceptsToRows()}
      {this.returnButton()}
      </div>
    );
  }

});
