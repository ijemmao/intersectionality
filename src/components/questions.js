import React, { Component } from 'react';
import Modal from 'react-modal';
import newNote from './../assets/images/new_note.svg';
import exit from './../assets/images/exit.svg';
import questions from './../actions/questions';
import questionsData from './../data/questions-data';
import './../styles/questions.css';

export default class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      questions: [],
      currentIndex: 0,
    };
  }

  componentWillMount = () => {
    questions.getQuestions().then((snapshot) => {
      let cleanedQuestions = this.convertQuestions(snapshot.val());
      if (cleanedQuestions.length === 0) {
        const tempQuestions = questionsData.tempQuestions;

        tempQuestions.forEach((q) => {
          questions.addQuestion({ author: this.props.uid, question: q });
        });

        questions.getQuestions().then((ss) => {
          cleanedQuestions = this.convertQuestions(ss.val());
          this.setState({ questions: cleanedQuestions });
        });
      } else {
        this.setState({ questions: cleanedQuestions });
      }
    });
  }

  convertQuestions = (qs) => {
    const entries = [];
    for (const index in qs) {
      if (Object.prototype.hasOwnProperty.call(qs, index)) {
        entries.push(qs[index]);
      }
    }
    return entries;
  }

  goBack = () => {
    let index = this.state.currentIndex - 1;
    if (index === -1) {
      index = this.state.questions.length - 1;
    }
    this.setState({ currentIndex: index });
  }

  goForward = () => {
    let index = (this.state.currentIndex + 1);
    if (index === this.state.questions.length) {
      index = 0;
    }
    this.setState({ currentIndex: index });
  }

  handleText = (e) => {
    this.setState({ text: e.target.value });
  }

  renderQuestion = () => {
    if (this.state.questions.length > this.state.currentIndex) {
      return (
        <p className="question">{this.state.questions[this.state.currentIndex].question}</p>
      );
    } return null;
  }

  renderIndex = () => {
    if (this.state.questions.length > 0) {
      return (
        <span>{this.state.currentIndex + 1} / {this.state.questions.length}</span>
      );
    } return null;
  }

  render() {
    return (
      <div className="questions-container">
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
                    setTimeout(() => {
                      questions.getQuestions().then((snapshot) => {
                        const cleanedQuestions = this.convertQuestions(snapshot.val());
                        this.setState({ questions: cleanedQuestions });
                      });
                    }, 2);
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
        <div className="questions-header">
          <h4>Questions to Think About</h4>
          <img
            src={newNote}
            alt="new questions"
            className="icon new-note"
            onClick={() => {
              this.setState({
                text: '',
              });
              this.props.openModal('question');
            }}
          />
        </div>
        {this.renderQuestion()}
        <span>
          <button className="questions-navigation" onClick={this.goBack}>{'<'}</button>
          <button className="questions-navigation" onClick={this.goForward}>{'>'}</button>
          {this.renderIndex()}
        </span>
      </div>
    );
  }
}
