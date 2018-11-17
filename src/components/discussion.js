import React, { Component } from 'react';
import Comment from './../components/comment';
import './../styles/discussion.css'

export default class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state= {
      comment: '',
      comments: [{ text: 'this is a comment', votes: 0 }],
    };
  }

  renderComments = () => {
    return this.state.comments.map((comment) => {
      return (<Comment comment={comment} />)
    })
  }

  handleCommentInput = (e) => {
    this.setState({ comment: e.target.value });
  }

  handleNewComment = () => {
    if (this.state.comment.length > 5) {
      let newComment = { text: this.state.comment, vote: 0 };
      let comments = this.state.comments;
      comments.push(newComment);
      this.setState({ comment: '', comments: comments });
    }
  }

  render() {
    return (
      <div className="discussion-container">
        <h1>Discussion</h1>
        <div className="input-container">
          <textarea rows="3" placeholder="Share your thoughts" className="discussion-text-input" value={this.state.comment} onChange={this.handleCommentInput} />
          <button type="submit" className="submit-comment" onClick={this.handleNewComment}>Submit</button>
        </div>
        {this.renderComments()}
      </div>
    )
  }
}