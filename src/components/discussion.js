import React, { Component } from 'react';

export default class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state= {};
  }

  render() {
    return (
      <div className="discussion-container">
        <h1>Discussion</h1>
        this is a discussions section
      </div>
    )
  }
}