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
          <h2 className="term">{this.props.term}</h2>
          <h3 className="type">{this.props.type}</h3>
          <input className="checkbox" type="checkbox" />
        </div>
        <h5 className="term-definition">{this.props.definition}</h5>
      </div>
    )
  }
}