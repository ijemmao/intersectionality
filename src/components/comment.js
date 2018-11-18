import React, { Component } from 'react';
import './../styles/comment.css';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="comment-container">
        {this.props.comment.text}
      </div>
    );
  }
}
