import React, { Component } from 'react';
import Modal from 'react-modal';
import Notes from './../components/notes';
import TermList from './../components/term-list';
import terms from './../actions/terms';
import notes from './../actions/notes';
import users from './../actions/users';
import exit from './../assets/images/exit.svg';
import './../styles/modal.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      modalIsOpen: false,
      noteModalIsOpen: false,
      welcomeModalIsOpen: false,
      terms: {},
      notes: {},
    };
  }

  componentWillMount = () => {
    users.signInAnon().then((data) => {
      if (data.added === 1) {
        this.setState({ welcomeModalIsOpen: true });
      }
      this.setState({ uid: data.uid });
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

  closeWelcomeModal = () => {
    this.setState({ welcomeModalIsOpen: false });
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          isOpen={this.state.welcomeModalIsOpen}
          onRequestClose={this.state.closeWelcomeModal}
          contentLabel="Welcome Modal"
        >
          <img src={exit} alt="exit" className="icon exit" onClick={this.closeWelcomeModal} />
          <div className="modal-introduction-container">
            <h1>Welcome to the Intersectionality Platform</h1>
            <h3>An online experience to connect students to learning materials and each other</h3>
            <div className="modal-introduction-instructions-container">
              <p>
                This platform has been created for students at Dartmouth College
                to further conversations surrounding the topic of the #MeToo movement and intersectionality.
              </p>
              <p>
                There are several features that have been included in this website that will
                give students the opportunities to interact with one another.
              </p>
              <p>
                Notes - Students can add anonymous notes that stay within the theme of the platform <br />
                Terms - There{'\''}s a pletora of identiteis that exist. This list is great place for students to curate a list of terms they know of or even use<br />
                Checkmarks - Students can anonymously check terms that use or identify with, so the data can be showcased to the entire platform.<br />
                Discussions - For each term, there{'\''}s a discussion section that give students the opportunity to ask questions or comment on that specific term.
              </p>
              <p>Most importantly, be kind, respectful, and open-minded</p>
              <button className="start-button" onClick={this.closeWelcomeModal}>Let{'\''}s go</button>
            </div>
          </div>
        </Modal>
        <Notes
          uid={this.state.uid}
          noteCards={this.state.notes}
          createNewNote={this.createNewNote}
          noteModalIsOpen={this.state.noteModalIsOpen}
          openModal={this.openModal}
          closeModal={this.closeModal}
        />
        <TermList
          uid={this.state.uid}
          terms={this.state.terms}
          createNewTerm={this.createNewTerm}
          modalIsOpen={this.state.modalIsOpen}
          openModal={this.openModal}
          closeModal={this.closeModal}
        />
      </React.Fragment>
    );
  }
}
