import React, { Component } from 'react';
import './../styles/note-card.css';

export default class NoteCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
  }

  render() {
    return (
      <div className="note-card">
        <h3 className="note-title">{this.props.title}</h3>
        <h5 className="note-text">{this.props.text}</h5>
      </div>
    )
  }
}