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
    let noteCards = [];
    for (let key in this.props.noteCards) {
      let card = this.props.noteCards[key];
      noteCards.push(<NoteCard uid={this.props.uid} key={key} id={key} card={card} />)
    }
    return noteCards;
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
                if (this.props.createNewNote({ author: this.props.uid, title: this.state.title, text: this.state.text, x: 0, y: 0 })) {
                  this.props.closeModal('note');
                }
              }}>submit</button>
            </div>
            <div className="word-instructions-container">
              <p>Think of the following when adding a new note to the platform:</p>
              <p>This tool is open to the public! Even though these notes are anonymous, think about the information you place on this board before you add them. This tools is meant to create a support community.</p>
              <p>These notes will be publically accessed and cannot be removed unless requested.</p>
              <p>Feel free to add as many notes as you feel necessary and benefical! Don't spam!</p>
              <p>Have fun!</p>
            </div>
          </div>
        </Modal>
        <div className="notes-header">
          <div>
            <h1>Notes</h1>
            <h6>Feel free to drag them around</h6>
          </div>
          <img src={newNote} alt="new note" className="icon new-note" onClick={() => {
            this.setState({
              title: '',
              text: '',
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