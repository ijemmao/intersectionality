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
        <div className="input-container">
          <textarea rows="3" placeholder="Share your thoughts" className="discussion-text-input" />
          <button type="submit" className="submit-comment">Submit</button>
        </div>
        {this.renderComments()}
      </div>
    )
  }
}