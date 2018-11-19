import React, { Component } from 'react';
import Stats from './../components/stats';
import Discussion from './../components/discussion';
import terms from './../actions/terms';
import users from './../actions/users';
import './../styles/detailed-term.css';

export default class DetailedTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      uid: null,
      term: null,
      type: null,
      definition: null,
      wikipediaInformation: null,
      comments: [],
      totalUsers: 0,
    };
  }

  componentWillMount = () => {
    const id = window.location.pathname.split('/')[2];
    this.setState({ id });
    terms.getTerm(id).then((snapshot) => {
      const value = snapshot.val();
      this.setState({
        term: value.term,
        type: value.type,
        definition: value.definition,
        comments: value.comments,
      });
      terms.getWiki(value.term).then((wikipedia) => {
        this.setState({ wikipediaInformation: wikipedia });
        console.log('okokok', wikipedia);
        wikipedia.forEach((wiki) => {
          document.querySelector('.wikipedia-body').appendChild(wiki);
        });
      }).catch((error) => {
        console.log(error.error);
      });
    });
    users.signInAnon().then((uid) => {
      this.setState({ uid });
    });
    users.getUsers().then((count) => {
      this.setState({ totalUsers: count });
    });
  }

  renderWikipedia = () => {
    return (
      <div className="wikipedia-container">
        <h1>From Wikipedia</h1>
        <div className="wikipedia-body" />
      </div>
    );
  }


  render() {
    return (
      <div className="detailed-container">
        <div className="left-detailed-container">
          <h1>{this.state.term}</h1>
          <h2>{this.state.type}</h2>
          <h4>{this.state.definition}</h4>
        </div>
        <div className="vertical-divider" />
        <div className="right-detailed-container">
          {this.state.wikipediaInformation ? this.renderWikipedia() : null}
          <Stats uid={this.state.uid} id={this.state.id} totalUsers={this.state.totalUsers} />
          <Discussion uid={this.state.uid} id={this.state.id} comments={this.state.comments} />
        </div>
      </div>
    );
  }
}
