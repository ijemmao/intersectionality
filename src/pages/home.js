import React, { Component } from 'react';
import Notes from './../components/notes';
import TermList from './../components/term-list';
import terms from './../actions/terms';
import notes from './../actions/notes';
import users from './../actions/users';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      modalIsOpen: false,
      noteModalIsOpen: false,
      terms: {},
      notes: {},
    }
  }

  componentWillMount = () => {
    users.signInAnon().then((uid) => {
      this.setState({ uid });
    });
    terms.getTerms().then((snapshot) => {
      this.setState({ terms: snapshot.val() });
    });
    notes.getNotes().then((snapshot) => {
      this.setState({ notes: snapshot.val() });
    });
  }

  createNewTerm = (information) => {
    if (information.term && information.definition && information.definition.length > 10) {
      terms.addTerm(information);
      terms.getTerms().then((snapshot) => {
        this.setState({ terms: snapshot.val() });
      });
      return true;
    }
    console.log('Either the term was not included or the definition was too short');
    return false;
  }

  createNewNote = (information) => {
    if (information.text && information.text.length > 5) {
      notes.addNote(information);
      notes.getNotes().then((snapshot) => {
        this.setState({ notes: snapshot.val() });
      });
      return true;
    }
    console.log('The description for the note is too short');
    return false;
  }

  openModal = (modal) => {
    if (modal === 'note') {
      this.setState({ noteModalIsOpen: true });
    } else {
      this.setState({ modalIsOpen: true });
    }
  }

  closeModal = (modal) => {
    if (modal === 'note') {
      this.setState({ noteModalIsOpen: false });
    } else {
      this.setState({ modalIsOpen: false });
    }
  }

  render() {
    return (
      <>
        <Notes uid={this.state.uid} noteCards={this.state.notes} createNewNote={this.createNewNote} noteModalIsOpen={this.state.noteModalIsOpen} openModal={this.openModal} closeModal={this.closeModal} />
        <TermList uid={this.state.uid} terms={this.state.terms} createNewTerm={this.createNewTerm} modalIsOpen={this.state.modalIsOpen} openModal={this.openModal} closeModal={this.closeModal} />
      </>
    )
  }
}