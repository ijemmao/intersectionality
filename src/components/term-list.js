import React, { Component } from 'react';
import Modal from 'react-modal';
import Term from './term';
import newNote from './../assets/images/new_note.svg';
import exit from './../assets/images/exit.svg';
import './../styles/term-list.css';

export default class TermList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      type: '',
      definition: '',
    };
  }
  componentWillMount = () => {
    Modal.setAppElement('body');
  }

  handleWordText = (e) => {
    this.setState({ term: e.target.value });
  }

  handleTypeText = (e) => {
    this.setState({ type: e.target.value });
  }

  handleDefinitionText = (e) => {
    this.setState({ definition: e.target.value });
  }

  renderTerms = () => {
    const terms = [];
    for (const key in this.props.terms) {
      if (Object.prototype.hasOwnProperty.call(this.props.terms, key)) {
        const term = this.props.terms[key];
        terms.push(<Term uid={this.props.uid} key={key} id={key} term={term} />);
      }
    }
    return terms;
  }

  render() {
    return (
      <div className="term-list">
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.closeModal}
          contentLabel="Add terms"
        >
          <img src={exit} alt="exit" className="icon exit" onClick={this.props.closeModal} />
          <div className="modal-content-container">
            <div className="word-input-container">
              <h1>New Term</h1>
              <input name="word" placeholder="e.g. word" value={this.state.term} onChange={this.handleWordText} />
              <input name="word-type" placeholder="e.g. noun" value={this.state.type} onChange={this.handleTypeText} />
              <input name="defintion" placeholder="e.g. this is a defintion" value={this.state.definition} onChange={this.handleDefinitionText} />
              <button className="submit-term"
                onClick={() => {
                  if (this.props.createNewTerm({
                    author: this.props.uid,
                    term: this.state.term,
                    type: this.state.type,
                    definition: this.state.definition,
                  })) {
                    this.props.closeModal();
                  }
                }}
              >
                Submit Term
              </button>
            </div>
            <div className="word-instructions-container">
              <p>Think of the following when adding a new term to the platform:</p>
              <p>This tool is open to the public! Think about the terms your place here before you add them. This tool is supposed to support the numerous communities that exist.</p>
              <p>These cards will be publicly accessed and cannot be removed unless requested.</p>
              <p>If you{'\''}re unable to add your term to the platform, make sure that the definition is long enough and that it hasn{'\''}t been added already</p>
              <p>Have fun!</p>
            </div>
          </div>
        </Modal>
        <div className="term-list-header">
          <div>
            <h1>Terms</h1>
            <h6>Create term cards to list identities</h6>
            <h6>Select terms you may use to identify for anonymous data collection</h6>
          </div>
          <img
            src={newNote}
            className="icon new-note"
            alt="new note"
            onClick={() => {
              this.setState({
                term: '',
                type: '',
                definition: '',
              });
              this.props.openModal();
            }}
          />
        </div>
        <div className="terms">
          {this.renderTerms()}
        </div>
      </div>
    );
  }
}
