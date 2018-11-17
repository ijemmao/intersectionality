import React, { Component } from 'react';
import Discussion from './../components/discussion';
import terms from './../actions/terms';

export default class DetailedTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: null,
      type: null,
      definition: null,
      wikipediaInformation: null,
    };
  }

  componentWillMount = () => {
    let id = window.location.pathname.split('/')[2];
    terms.getTerm(id).then((snapshot) => {
      let value = snapshot.val();
      terms.getWiki(value.term).then((wikipedia) => {
        if (!wikipedia.props) {
          this.setState({ wikipediaInformation: wikipedia });
          document.querySelector('.wikipedia-body').appendChild(wikipedia);
        }
      })
    })
  }

  renderWikipedia = () => {
    return (
      <div className="wikipedia-container">
        <h1>From Wikipedia</h1>
        <div className="wikipedia-body"></div>
      </div>
    )
  }


  render() {
    return (
      <div>
        <div className="left-detailed-container">
          this is a detailed page of the term!
        </div>
        <div className="right-detailed-container">
          {this.state.wikipediaInformation ? this.renderWikipedia() : null}
          <Discussion />
        </div>
      </div>
    )
  }
}