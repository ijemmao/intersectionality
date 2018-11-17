import React, { Component } from 'react';
import axios from 'axios';

export default class DetailedTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: this.props.term.term,
      type: this.props.term.type,
      definition: this.props.term.definition,
      wikipediaText: '',
    };
  }

  componentWillMount = () => {
    axios.get(`https://en.wikipedia.org/w/api.php?action=parse&page=${this.props.term.term}`).then((res) => {
      console.log(res.parse.text);
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