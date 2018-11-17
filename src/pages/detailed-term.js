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
      console.log(value.term)
      terms.getWiki(value.term).then((wikipedia) => {
        this.setState({ wikipediaInformation: wikipedia });
        document.querySelector('.wikipedia-body').appendChild(wikipedia);
      }).catch((error) => {
        console.log(error.error);
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
          <h1>{this.state.term}</h1>
          <h2>{this.state.type}</h2>
          <h4>{this.state.definition}</h4>
        </div>
        <div className="right-detailed-container">
          {this.state.wikipediaInformation ? this.renderWikipedia() : null}
          <Discussion />
        </div>
      </div>
    )
  }
}