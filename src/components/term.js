import React, { Component } from 'react';
import terms from '../actions/terms';
import './../styles/term.css';

export default class Term extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    if (this.props.term.selection && this.props.term.selection[this.props.uid]) {
      let checkbox = document.querySelector(`#${this.props.id}.checkbox`);
      checkbox.checked = true;
    }
  }

  handleDetail = () => {
    window.location = `term/${this.props.id}`;
  }

  handleSelection = (e) => {
    let data = Object.assign({ uid: this.props.uid, id: this.props.id, checked: e.target.checked }, this.props.term);
    terms.updateTerm(data);
  }

  render() {
    return (
      <div className="card" onClick={this.handleDetail}>
          <input id={this.props.id} className="checkbox" type="checkbox" onClick={this.handleSelection} />
          <div className="card-header">
            <h2 className="term">{this.props.term.term}</h2>
            <h3 className="type">{this.props.term.type}</h3>
          </div>
          <h5 className="term-definition">{this.props.term.definition}</h5>
      </div>
    )
  }
}