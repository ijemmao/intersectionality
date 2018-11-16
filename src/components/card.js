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
        <div className="card-header">
          <h2 className="word">{this.props.word}</h2>
          <h3 className="type">{this.props.type}</h3>
        </div>
        <h5 className="word-definition">{this.props.definition}</h5>
      </div>
    )
  }
}