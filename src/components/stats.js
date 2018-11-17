import React, { Component } from 'react';
import stats from './../actions/stats';

export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stat: null,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.id) {
      console.log(nextProps)
      stats.getSelectedTermCount(nextProps.id).then((selected) => {
        this.setState({ stat: selected });
      })
    }
  }

  calculateStat = () => {
    let percentage = this.state.stat / this.props.totalUsers * 100;
    return `${percentage}% of users of this platform either use or identify with this term`;
  }

  render() {
    return (
      <div>
        <h1>Statistics</h1>
        <p>{this.state.stat !== null ? this.calculateStat() : 'Calculating...'}</p>
      </div>
    )
  }
}