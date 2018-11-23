import React, { Component } from 'react';
import Comment from './../components/comment';
import terms from './../actions/terms';
import './../styles/discussion.css';

export default class Discussion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      comments: [],
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.comments) {
      this.setState({ comments: nextProps.comments });
    }
  }

  handleCommentInput = (e) => {
    this.setState({ comment: e.target.value });
  }

  handleNewComment = () => {
    if (this.state.comment.length > 5) {
      const newComment = { text: this.state.comment, vote: 0 };
      const comments = this.state.comments;
      comments.push(newComment);
      this.setState({ comment: '', comments });
      terms.addComment({ id: this.props.id, comment: newComment });
    }
  }

  renderComments = () => {
    return this.state.comments.map((comment, index) => {
      return (<Comment key={index} comment={comment} />);
    });
  }

  render() {
    return (
      <div className="discussion-container">
        <h1>Discussion</h1>
        <h6>With the provided information above, continue the conversation about this term below</h6>
        <div className="input-container">
          <textarea rows="3" placeholder="Share your thoughts" className="discussion-text-input" value={this.state.comment} onChange={this.handleCommentInput} />
          <button type="submit" className="submit-comment" onClick={this.handleNewComment}>Submit</button>
        </div>
        {this.renderComments()}
      </div>
    );
  }
}
