import React from 'react'
import _ from "underscore"

export default React.createClass({

  generateConceptResults: function() {
    const results = this.props.data.results.map((res) => {
      var obj = {};
      obj.conceptName = res.concept.conceptName;
      obj.concept_uid = res.concept.uid;
      obj.metadata = {};
      if (res.found === true) {
        obj.metadata.correct = 1
      } else {
        obj.metadata.correct = 0
      }
      if (res.fixed === true) {
        obj.metadata.correct += 1
      }
      return obj
    })
    return results;
  },

  generatePercentage: function() {
    let count = this.props.data.results.length;
    let correct = this.props.data.results.filter((res) => res.correct).length
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
          <td>{row.total}</td>
          <td>{row.correct}</td>
          <td>{row.total - row.correct}</td>
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
              <th>Total<br/>Answered</th>
              <th>Correct</th>
              <th>Incorrect</th>
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
        results[p.concept_uid].total += 1
      } else {
        results[p.concept_uid] = {
          name: p.conceptName,
          uid: p.concept_uid,
          correct: p.metadata.correct,
          total: 1
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
      <button type='button' className='btn btn-action' onClick={window.location.reload.bind(window.location)}>Return to Homepage</button>
    );
  },

  exit: function() {
    this.props.dispatch(exitToHome());
  },

  render: function() {
    return (
      <div>
      <h3>You completed the digraphs activity. We'll now generate a personalized learning plan tailored to your needs.</h3>
      <h3>{this.generatePercentage()} Correct</h3>
      {this.conceptsToRows()}
      {this.returnButton()}
      </div>
    );
  }

});
