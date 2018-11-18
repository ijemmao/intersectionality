import React, { Component } from 'react';
import Modal from 'react-modal';
import newNote from './../assets/images/new_note.svg';
import exit from './../assets/images/exit.svg';
import questions from './../actions/questions';
import './../styles/questions.css';

export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      questions: [
        // 'What does #MeToo mean to you?',
        // 'How does one\'s identity come into play when talking about sexual harassment or assault?',
        // 'What are your opinions on how institutions like Dartmouth handle sexual asssult?',
        // 'Do you think there\'s a group of people who bear the responsiblity and power to end sexual harassment?',
      ],
      currentIndex: 0,
    };
  }

  componentDidMount = () => {
    questions.getQuestions().then((snapshot) => {
      const cleanedQuestions = this.convertQuestions(snapshot.questions);
      this.setState({ questions: cleanedQuestions });
    });
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps);
    if (nextProps.questions) {
      const cleanedQuestions = this.convertQuestions(nextProps.questions);
      this.setState({ questions: cleanedQuestions });
    }
  }

  convertQuestions = (qs) => {
    console.log(qs);
    const entries = Object.entries(qs);
    console.log(entries);
    return qs;
  }

  goBack = () => {
    let index = this.state.currentIndex - 1;
    if (index === -1) {
      index = this.state.questions.length - 1;
    }
    this.setState({ currentIndex: index });
  }

  goForward = () => {
    let index = this.state.currentIndex + 1;
    if (index === this.state.questions.length) {
      index = 0;
    }
    this.setState({ currentIndex: index });
  }

  handleText = (e) => {
    this.setState({ text: e.target.value });
  }

  renderQuestion = () => {
    return (
      <p>{this.state.questions[this.state.currentIndex]}</p>
    );
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.questionModalIsOpen}
          onRequestClose={this.props.closeModal}
          contentLabel="Add notes"
        >
          <img src={exit} alt="exit" className="icon exit" onClick={() => this.props.closeModal('question')} />
          <div className="modal-content-container">
            <div className="word-input-container">
              <h1>New Question</h1>
              <input name="title" placeholder="e.g. What does #MeToo mean?" value={this.state.text} onChange={this.handleText} />
              <button
                className="submit-note"
                onClick={() => {
                  if (this.props.createNewQuestion({
                    author: this.props.uid,
                    question: this.state.text,
                  })) {
                    this.props.closeModal('question');
                  }
                }}
              >
                Submit Question
              </button>
            </div>
            <div className="word-instructions-container">
              <p>Think of the following when adding a new question to platform:</p>
              <p>
                This tool is open to the public! Even though these notes are anonymous,
                think about the information you place on this board before you add them.
                This tools is meant to create a support community
              </p>
              <p>How does this questions further conversations surrounding identity and sexual harassment?</p>
              <p>Does this directly or indirectly attacks or harms people?</p>
              <p>What is the intention of this question?</p>
            </div>
          </div>
        </Modal>
        <h4>Questions to Think About</h4>
        {this.renderQuestion()}
        <img
          src={newNote}
          alt="new questions"
          className="icon new-note"
          onClick={() => {
            this.setState({

            });
            this.props.openModal('question');
          }}
        />
        <button className="questions-navigation" onClick={this.goBack}>{'<'}</button>
        <button className="questions-navigation" onClick={this.goForward}>{'>'}</button>
      </div>
    );
  }
}
