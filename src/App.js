import React, { Component } from 'react';
import CardList from './components/card-list';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
    this.testingData = [{ word: 'ijemma', type: 'person', definition: 'a student at dartmouth college'}, { word: 'dance', definition: 'the act of moving the body to music' }]
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

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }
  render() {
    return (
      <div className="App">
        <CardList words={this.testingData} createNewTerm={this.createNewTerm} modalIsOpen={this.state.modalIsOpen} openModal={this.openModal} closeModal={this.closeModal} />
      </div>
    );
  }
}