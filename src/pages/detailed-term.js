import React, { Component } from 'react';
import terms from './../actions/terms';

export default class DetailedTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: null,
      type: null,
      definition: null,
      wikipediaText: '',
    };
  }

  componentWillMount = () => {
    let id = window.location.pathname.split('/')[2];
    terms.getTerm(id).then((snapshot) => {
      let value = snapshot.val();
      terms.getWiki(value.term).then((wikipedia) => {
        if (wikipedia.props) { // wikipedia page doesn't exist
          document.querySelector('.wikipedia-body').innerHTML = '<p>No information from Wikipedia</p>';
        } else {
          document.querySelector('.wikipedia-body').appendChild(wikipedia);
        }
      })
    })
  }


  render() {
    return (
      <div>
        <div className="left-detailed-container">
          this is a detailed page of the term!
        </div>
        <div className="right-detailed-container">
          <h1>From Wikipedia</h1>
          <div className="wikipedia-body"></div>
        </div>
      </div>
    )
  }
}