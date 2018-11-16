import React, { Component } from 'react';
import Draggable from 'react-draggable';
import notes from './../actions/notes';
import './../styles/note-card.css';

export default class NoteCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        x: this.props.x,
        y: this.props.y,
      }
    };
  }
  
  onDrag = (e) => {
    this.setState({ position: { x: e.clientX, y: e.clientY }});
  }

  onStopDrag = (e) => {
    this.setState({ position: { x: e.clientX * .6 , y: e.clientY * .6}});
    notes.updateNotePosition({ id: this.props.id, title: this.props.title, text: this.props.text, x: e.clientX * .6, y: e.clientY * .6});
  }

  render() {
    return (
      <div>
        <Draggable
          handle=".note-card"
          grid={[1, 1]}
          position={this.state.position}
          onStart={this.onStartDrag}
          onDrag={this.onDrag}
          onStop={this.onStopDrag}
        >
          <div className="note-card">
            <h3 className="note-title">{this.props.title}</h3>
            <h5 className="note-text">{this.props.text}</h5>
          </div>
        </Draggable>
      </div>
    )
  }
}