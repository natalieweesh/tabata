import React, { Component } from 'react';
import ProgressBar from './ProgressBar';

export default class ActiveWorkoutSection extends Component {
  render() {
    const {
      resting,
      currentExercise,
      currentIntervalCount,
      theTime,
      formatTime,
      restTime,
      workTime,
      rounds,
      selectedMuscleGroups,
      exerciseIndex
    } = this.props;
    return <div>
      <ProgressBar theTime={theTime} restTime={restTime} workTime={workTime} rounds={rounds} />
      <div className={resting.current ? 'restText row mainRow' : 'workText row mainRow'}>
        <div className="column bigger">
          <p className="exerciseTitle">{currentExercise.current && currentExercise.current['title']}</p>
          <img src={currentExercise.current && currentExercise.current['img']} alt={currentExercise.current && currentExercise.current['title']} />
          <p>[work your {currentExercise.current['muscle'] === 'arms' ? 'arms / chest' : selectedMuscleGroups[exerciseIndex.current]}]</p>
        </div>
        <div className="column smaller">
          <div className='centerize'>
            <p className='countdownTitle'>{resting.current ? "REST" : "WORK"}</p>
            <p className="countdown">{currentIntervalCount.current >= 0 ? currentIntervalCount.current : ""}</p>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="column">
        <p>Time elapsed: {formatTime(theTime)}</p>
      </div>
    </div>
  </div>
  }
}