import React, { Component } from 'react';
import Card from './card';
import newNote from './../assets/images/new_note.svg';
import Modal from 'react-modal';
import exit from './../assets/images/exit.svg';
import './../styles/card-list.css';

export default class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '',
      type: '',
      definition: '',
    };
  }
  componentWillMount = () => {
    Modal.setAppElement('body');
  }

  renderCards = () => {
    return this.props.words.map((data) => {
      return <Card word={data.word} definition={data.definition} />
    })
  }

  handleWordText = (e) => {
    this.setState({ word: e.target.value });
  }

  handleTypeText = (e) => {
    this.setState({ type: e.target.value });
  }

  handleDefinitionText = (e) => {
    this.setState({ definition: e.target.value });
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onRequestClose={this.props.closeModal}
          contentLabel="Example Modal"
        >
          <img src={exit} alt="exit" className="icon exit" onClick={this.props.closeModal} />
          <div className="modal-content-container">
            <div className="word-input-container">
              <h1>New Term</h1>
              <input name="word" placeholder="e.g. word" value={this.state.word} onChange={(e) => this.handleWordText(e)}></input>
              <input name="word-type" placeholder="e.g. noun" value={this.state.type} onChange={this.handleTypeText}></input>
              <input name="defintion" placeholder="e.g. this is a defintion" value={this.state.defintiion} onChange={this.handleDefinitionText}></input>
              <button onClick={() => this.props.createNewTerm}>submit</button>
            </div>
            <div className="word-instructions-container">
              <p>just remember this is a tool that is supposed to help the community</p>
              <p>this cards will be publically accessed and cannot be removed unless requested</p>
              <p>create cards that will make for a more inclusive space</p>
              <p>if you are unable to create your card, the card already exists</p>
              <p>have fun!</p>
            </div>
          </div>
        </Modal>
        <h1>Definitions</h1>
        <img src={newNote} alt="new note" className="icon" onClick={() => {
          this.setState({
            word: '',
            type: '',
            definition: '',
          });
          this.props.openModal()
          }} />
        {this.renderCards()}
      </div>
    )
  }
}