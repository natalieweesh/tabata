import React, { Component } from 'react';
import { exercises } from '../exercises';

export default class PreviewSection extends Component {
  render() {
    const { printExerciseCounts } = this.props;
    return <div className="row">
      {Object.keys(exercises).map(muscle => {
        return <div>
          <p className="exerciseTitle">exercises for your {muscle === 'arms' ? 'arms + chest' : muscle}:</p>
          <div className="row previewRow" id={`${muscle}-previews`}>
          {exercises[muscle].map(exercise => {
            return <div className="column">
              <p>{exercise['title']}</p>
              <div className="previewImageWrapper">
                {exercise['bodyweight'] && <div className='bodyweightBanner'>Bodyweight</div>}
                <img src={exercise['img']} alt={exercise['title']}/>
              </div>
            </div>
          })}
          </div>
        </div>
      })}
      <div>{printExerciseCounts()}</div>
    </div>
  }
}