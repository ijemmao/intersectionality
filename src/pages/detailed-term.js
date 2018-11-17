import React, { Component } from 'react';
import Discussion from './../components/discussion';
import terms from './../actions/terms';
import users from './../actions/users';
import './../styles/detailed-term.css';

export default class DetailedTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
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
      this.setState({
        term: value.term,
        type: value.type,
        definition: value.definition,
      })
      terms.getWiki(value.term).then((wikipedia) => {
        if (!wikipedia.props) {
          this.setState({ wikipediaInformation: wikipedia });
          document.querySelector('.wikipedia-body').appendChild(wikipedia);
        }
      })
    })
    users.signInAnon().then((uid) => {
      this.setState({ uid });
    });
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
      <div className="detailed-container">
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