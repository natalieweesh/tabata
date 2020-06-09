import React, { Component } from 'react';

export default class DataSection extends Component {
  render() {
    const { allExercises, tableRows, trainerTableRows } = this.props;
    return <div>
      <p className='exerciseTitle'>that's {allExercises.length} different exercises for you to do!</p>
      <div className='row statisticsRow'>
        <table className='column'>
          <tbody>
            <tr><td>muscle<br></br>group</td><td>total<br/>exercises</td><td>bodyweight<br/>exercises</td><td>low impact<br/>exercises</td></tr>
              {tableRows.map(e => e)}
          </tbody>
        </table>
        <table className='column '>
          <tbody>
            <tr><td>trainer</td><td>total<br/>exercises</td></tr>
            {trainerTableRows.map(e => e)}
          </tbody>
        </table>
      </div>
    </div>
  }
}