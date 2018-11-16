import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './../styles/note-card.css';

export default class NoteCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        x: 0,
        y: 0,
      }
    };
  }

  onStartDrag = (e) => {
  }

  onDrag = (e) => {
    console.log(e);
    this.setState({ position: { x: e.x, y: e.y }});
  }

  onStopDrag = (e) => {
    this.setState({ position: { x: e.clientX - 90, y: e.clientY - 90 }});
  }

  render() {
    return (
      <div>
        <Draggable
          handle=".note-card"
          grid={[10, 10]}
          defaultPosition={{ x: 20, y: 20 }}
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