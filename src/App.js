import React, { Component } from 'react';
import Home from './pages/home';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}