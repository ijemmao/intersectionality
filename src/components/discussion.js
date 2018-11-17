import React, { Component } from 'react';
import Comment from './../components/comment';
import './../styles/discussion.css'

export default class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state= {};
  }

  renderComments = () => {
    return (<Comment />)
  }

  render() {
    return (
      <div className="discussion-container">
        <h1>Discussion</h1>
        <textarea rows="3" cols="45" placeholder="Share your thoughts" className="discussion-text-input" />
        {this.renderComments()}
      </div>
    )
  }
}