import React, { Component } from 'react';
import './../styles/card.css';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="card">
        <h2 className="word">{this.props.word}</h2>
        <h6 className="word-definition">{this.props.definition}</h6>
      </div>
    )
  }
}