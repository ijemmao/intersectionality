import React, { Component } from 'react';
import Modal from 'react-modal';
import NoteCard from './note-card';
import Questions from './questions';
import exit from './../assets/images/exit.svg';
import newNote from './../assets/images/new_note.svg';
import './../styles/notes.css';

export default class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
    };
  }

  handleTitleText = (e) => {
    this.setState({ title: e.target.value });
  }

  handleText = (e) => {
    this.setState({ text: e.target.value });
  }

  renderNoteCards = () => {
    const noteCards = [];
    for (const key in this.props.noteCards) {
      if (Object.prototype.hasOwnProperty.call(this.props.noteCards, key)) {
        const card = this.props.noteCards[key];
        noteCards.push(<NoteCard uid={this.props.uid} key={key} id={key} card={card} />);
      }
    }
    return noteCards;
  }

  render() {
    return (
      <div className="notes">
        <Modal
          isOpen={this.props.noteModalIsOpen}
          onRequestClose={this.props.closeModal}
          contentLabel="Add notes"
        >
          <img src={exit} alt="exit" className="icon exit" onClick={() => this.props.closeModal('note')} />
          <div className="modal-content-container">
            <div className="word-input-container">
              <h1>New Note</h1>
              <input name="title" placeholder="e.g. this is a title" value={this.state.title} onChange={this.handleTitleText} />
              <input name="text" placeholder="e.g. this is a description" value={this.state.text} onChange={this.handleText} />
              <button
                className="submit-note"
                onClick={() => {
                  if (this.props.createNewNote({
                    author: this.props.uid,
                    title: this.state.title,
                    text: this.state.text,
                    x: 0,
                    y: 0,
                  })) {
                    this.props.closeModal('note');
                  }
                }}
              >
                Submit Note
              </button>
            </div>
            <div className="word-instructions-container">
              <p>Think of the following when adding a new note to the platform:</p>
              <p>
                This tool is open to the public! Even though these notes are anonymous,
                think about the information you place on this board before you add them.
                This tools is meant to create a support community
              </p>
              <p>These notes will be publically accessed and cannot be removed unless requested.</p>
              <p>Feel free to add as many notes as you feel necessary and benefical! Don{'\''}t spam!</p>
              <p>For reading materials to guide conversations further, use the Syllabus page <a href="https://journeys.dartmouth.edu/metoo/syllabus/">#MeToo Blog</a></p>
              <p>The password is: metoof18</p>
              <p>Have fun!</p>
            </div>
          </div>
        </Modal>
        <div className="notes-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h1>Notes</h1>
              <img
                src={newNote}
                alt="new note"
                className="icon new-note"
                onClick={() => {
                  this.setState({
                    title: '',
                    text: '',
                  });
                  this.props.openModal('note');
                }}
              />

            </div>
            <h6>Add anonymous note cards to engage conversations</h6>
            <h6>Feel free to draf the cards around</h6>
          </div>
          <Questions
            uid={this.props.uid}
            questions={this.props.questions}
            createNewQuestion={this.props.createNewQuestion}
            openModal={this.props.openModal}
            closeModal={this.props.closeModal}
            questionModalIsOpen={this.props.questionModalIsOpen}
          />
        </div>
        <div>
          {this.renderNoteCards()}
        </div>
      </div>
    );
  }
}
