import React, { Component } from 'react';
import CardList from './components/card-list';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
    this.testingData = [{ word: 'ijemma', definition: 'a student at dartmouth college'}, { word: 'dance', definition: 'the act of moving the body to music' }]
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
        <CardList words={this.testingData} modalIsOpen={this.state.modalIsOpen} openModal={this.openModal} closeModal={this.closeModal} />
      </div>
    );
  }
}