import React, { Component } from 'react';

export default class ProgressBar extends Component {
  render() {
    const { theTime, restTime, workTime, rounds } = this.props;
    return <div className="row progressRow">
      <div className="progressBar">
        <div className="fill" style={{width: `${parseInt(theTime / ((restTime + workTime) * rounds.current) * 100)}%`}}></div>
      </div>
    </div>
  }
}