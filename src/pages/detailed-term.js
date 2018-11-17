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
      // console.log(`https://en.wikipedia.org/w/api.php?action=parse&page=${value.term}`);
      terms.getWiki(value.term);
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