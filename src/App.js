import React, { Component } from 'react';
import CardList from './components/card-list';
import Notes from './components/notes';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      noteModalIsOpen: false,
    };
    this.testingData = [{ word: 'ijemma', type: 'person', definition: 'a student at dartmouth college'}, { word: 'dance', definition: 'the act of moving the body to music' }]
    this.testingNotes = []
  }

  createNewTerm = (information) => {
    let testingData = this.testingData;
    if (information.word && information.definition && information.definition.length > 10) {
      testingData.push({ word: information.word, type: information.type, definition: information.definition });
      this.setState({ testingData: testingData });
      return true;
    }
      console.log('Either the term was not included or the definition was too short');
      return false;
  }

  createNewNote = (information) => {
    let testingNotes = this.testingNotes;
    if (information.text && information.text.length > 5) {
      testingNotes.push({ title: information.title, text: information.text });
      this.setState({ testingNotes: testingNotes });
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
      <div className="App">
        <Notes noteCards={this.state.testingNotes} noteModalIsOpen={this.state.noteModalIsOpen} openModal={this.openModal} closeModal={this.closeModal} />
        <CardList words={this.testingData} createNewTerm={this.createNewTerm} modalIsOpen={this.state.modalIsOpen} openModal={this.openModal} closeModal={this.closeModal} />
      </div>
    );
  }
}