import React, { Component } from 'react';
import Modal from 'react-modal';
import NoteCard from './note-card';
import exit from './../assets/images/exit.svg';
import newNote from './../assets/images/new_note.svg';
import './../styles/notes.css';

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
    }
  }

  renderNoteCards = () => {
    return this.props.noteCards.map((card) => {
      return <NoteCard title={card.title} text={card.text} />
    })
  }

  handleTitleText = (e) => {
    this.setState({ title: e.target.value });
  }

  handleText = (e) => {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <div className="notes">
        <Modal
          isOpen={this.props.noteModalIsOpen}
          onRequestClose={this.props.closeModal}
          contentLabel="Example Modal"
        >
          <img src={exit} alt="exit" className="icon exit" onClick={() => this.props.closeModal('note')} />
          <div className="modal-content-container">
            <div className="word-input-container">
              <h1>New Note</h1>
              <input name="title" placeholder="e.g. this is a title" value={this.state.title} onChange={this.handleTitleText}></input>
              <input name="text" placeholder="e.g. this is a description" value={this.state.text} onChange={this.handleText}></input>
              <button className="submit-note" onClick={() => {
                if (this.props.createNewNote({ title: this.state.title, text: this.state.text })) {
                  this.props.closeModal();
                }
              }}>submit</button>
            </div>
            <div className="word-instructions-container">
              <p>Think of the following when adding a new term to the platform:</p>
              <p>This tool is open to the public! Think about the terms your place here before you add them. This tool is supposed to support the numerous communities that exist.</p>
              <p>These cards will be publically accessed and cannot be removed unless requested.</p>
              <p>If you're unable to add your term to the platform, make sure that the definition is long enough and that it hasn't been added already</p>
              <p>Enjoy</p>
            </div>
          </div>
        </Modal>
        <div className="notes-header">
          <h1>Notes</h1>
          <img src={newNote} alt="new note" className="icon new-note" onClick={() => {
            this.setState({
              word: '',
              type: '',
              definition: '',
            });
            this.props.openModal('note')
          }} />
        </div>
        <div>
          {this.renderNoteCards()}
        </div>
      </div>
    )
  }
}