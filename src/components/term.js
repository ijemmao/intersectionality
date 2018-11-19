import React, { Component } from 'react';
import terms from '../actions/terms';
import users from '../actions/users';
import edit from './../assets/images/edit.svg';
import './../styles/term.css';

export default class Term extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      checked: false,
      term: this.props.term.term,
      type: this.props.term.type,
      definition: this.props.term.definition,
      updatedTerm: null,
      updatedType: null,
      updatedDefinition: null,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.term.selection && nextProps.term.selection[nextProps.uid]) {
      const checkbox = document.querySelector(`#${this.props.id}.checkbox`);
      checkbox.checked = true;
      users.includeUser(nextProps.uid);
      this.setState({ checked: true });
    }
  }

  handleEdit = () => {
    this.setState({ editing: !this.state.editing });
  }

  handleDetail = () => {
    window.location = `term/${this.props.id}`;
  }

  handleSelection = (e) => {
    this.setState({ checked: e.target.checked });
    const data = Object.assign({ uid: this.props.uid, id: this.props.id, checked: e.target.checked }, this.props.term);
    terms.updateTerm(data);
  }

  handleTerm = (e) => {
    this.setState({ term: e.target.value });
  }

  handleType = (e) => {
    this.setState({ type: e.target.value });
  }

  handleDefinition = (e) => {
    users.includeUser(this.props.uid);
    this.setState({ definition: e.target.value });
  }

  updateCard = () => {
    const data = {
      uid: this.props.uid,
      id: this.props.id,
      checked: this.state.checked,
      author: this.props.term.author,
      term: this.state.term,
      type: this.state.type,
      definition: this.state.definition,
    };
    terms.updateTerm(data).then(() => {
      terms.getTerm(this.props.id).then((snapshot) => {
        const value = snapshot.val();
        this.setState({
          updatedTerm: value.term,
          updatedType: value.type,
          updatedDefinition: value.definition,
        });
      });
    });
    this.handleEdit();
  }

  renderCard = () => {
    if (!this.state.editing) {
      return (
        <span className="card-body" onClick={this.handleDetail} role="button" tabIndex={0}>
          <div className="card-header">
            <h2 className="term">{this.state.updatedTerm ? this.state.updatedTerm : this.props.term.term}</h2>
            <h3 className="type">{this.state.updatedType ? this.state.updatedType : this.props.term.type}</h3>
          </div>
          <h5 className="term-definition">{this.state.updatedDefinition ? this.state.updatedDefinition : this.props.term.definition}</h5>
        </span>
      );
    } else {
      return (
        <span className="card-body">
          <div className="card-input-header">
            <input className="term-input" value={this.state.term} onChange={this.handleTerm} />
            <input className="type-input" value={this.state.type} onChange={this.handleType} />
          </div>
          <textarea className="definition-input" rows="5" value={this.state.definition} onChange={this.handleDefinition} />
          <button className="submit-note update-term" onClick={this.updateCard}>Update</button>
        </span>
      );
    }
  }

  render() {
    return (
      <div className="card">
        <img src={edit} className="icon" id="edit" alt="edit" onClick={this.handleEdit} />
        <input id={this.props.id} className="checkbox" type="checkbox" onClick={this.handleSelection} />
        {this.renderCard()}
      </div>
    );
  }
}
