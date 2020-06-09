import React, { Component } from 'react';
import titleGif from '../titleimage.gif';
import { exercises } from '../exercises';

export default class Settings extends Component {
  render() {
    const {
      setWorkTime,
      workTime,
      setRestTime,
      restTime,
      setTotalTime,
      totalTime,
      selectedMuscleGroups,
      setSelectedMuscleGroups,
      bodyweightOnly,
      setBodyweightOnly,
      subrounds,
      setSubrounds,
      singleWeightOnly,
      setSingleWeightOnly,
      allAtOnce,
      setAllAtOnce,
      lowImpact,
      setLowImpact
    } = this.props;
    return (
      <>
        <div><img className="titleImage pageTitle" src={titleGif} alt="It's Tabata Time!"/></div>
        <div className="settingsRow">
          <div className="row">
            <div className="column">
              <label>Choose your work time:</label>
              <select className="select-css" onChange={e => {
                setWorkTime(parseInt(e.target.value))
              }} value={workTime}>
                <option value="5">5 seconds</option>
                <option value="20">20 seconds</option>
                <option value="30">30 seconds</option>
                <option value="45">45 seconds</option>
                <option value="50">50 seoncds</option>
                <option value="60">60 seconds</option>
              </select>
            </div>
            <div className="column">
              <label>Choose your rest time:</label>
              <select className="select-css" onChange={e => setRestTime(parseInt(e.target.value))} value={restTime}>
                <option value="3">3 seconds</option>
                <option value="10">10 seconds</option>
                <option value="15">15 seconds</option>
                <option value="20">20 seconds</option>
                <option value="25">25 seconds</option>
                <option value="30">30 seconds</option>
              </select>
            </div>
            <div className="column">
              <label>Choose your total workout duration:</label>
              <select className="select-css" onChange={e => setTotalTime(parseInt(e.target.value))} value={totalTime}>
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
                <option value="300">5 minutes</option>
                <option value="600">10 minutes</option>
                <option value="900">15 minutes</option>
                <option value="1200">20 minutes</option>
                <option value="1500">25 minutes</option>
                <option value="1800">30 minutes</option>
                <option value="2100">35 minutes</option>
                <option value="2400">40 minutes</option>
                <option value="2700">45 minutes</option>
              </select>
            </div>
          </div>
          <div>
            <div className="row muscleRowTitle">
              <label>Select the muscle groups to focus on:</label>
            </div>
            <div className="row muscleRow">
                {Object.keys(exercises).map(muscle => {
                  return <div className="checkboxWrapper" key={muscle}>
                    <label className="checkboxLabel" htmlFor={muscle}>
                      {muscle === 'arms' ? 'ARMS + CHEST' : 'ARMS'}
                    </label>
                    <input onChange={() => {
                      if (selectedMuscleGroups.includes(muscle)) {
                        setSelectedMuscleGroups(selectedMuscleGroups.filter(x => x !== muscle))
                      } else {
                        setSelectedMuscleGroups(selectedMuscleGroups.concat([muscle]))
                      }
                    }} checked={selectedMuscleGroups.includes(muscle)} id={muscle} value={muscle} type="checkbox"/>
                    <div className="fakeCheckbox">{muscle === 'arms' ? 'ARMS + CHEST' : muscle.toUpperCase()}</div>
                  </div>
                })}
            </div>
          </div>
          <div>
            <div className="row">
              <label>Extra options:</label>
            </div>
            <div className="row muscleRow">
              <div className="checkboxWrapper">
                <label className="checkboxLabel" htmlFor='bodyweight'>BODYWEIGHT ONLY</label>
                <input onChange={() => {
                  setBodyweightOnly(!bodyweightOnly);
                  setSingleWeightOnly(false);
                }} checked={bodyweightOnly} id='bodyweight' value='Bodyweight only' type="checkbox"/>
                <div className="fakeCheckbox">BODYWEIGHT ONLY</div>
              </div>
              <div className="checkboxWrapper">
                <label className="checkboxLabel" htmlFor='singleweight'>I ONLY HAVE 1 DUMBBELL</label>
                <input onChange={() => {
                  setSingleWeightOnly(!singleWeightOnly);
                  setBodyweightOnly(false);
                }} checked={singleWeightOnly} id='singleweight' value='Singleweight only' type="checkbox"/>
                <div className="fakeCheckbox">I ONLY HAVE 1 DUMBBELL</div>
              </div>
              <div className="checkboxWrapper"><label className="checkboxLabel" htmlFor='lowimpact'>LOW IMPACT</label>
                <input onChange={() => {
                  setLowImpact(!lowImpact);
                }} checked={lowImpact} id='lowimpact' value='Low impact' type="checkbox"/>
                <div className="fakeCheckbox">LOW IMPACT</div>
              </div>
            </div>
            <div className="row">
              <label>How many times do you want to repeat each exercise?</label>
            </div>
            <div className="row muscleRow">
              <div className="column">
                <select className='select-css' onChange={e => setSubrounds(parseInt(e.target.value))} value={subrounds}>
                  <option value="1">No Repeats!</option>
                  <option value="2">2 times</option>
                  <option value="3">3 times</option>
                  <option value="4">4 times</option>
                  <option value="5">5 times</option>
                  <option value="6">6 times</option>
                </select>
              </div>
              {subrounds !== 1 && <>
                <div className="column">
                  <div className="checkboxWrapper">
                    <label className="checkboxLabel" htmlFor='roundRobin'>CIRCUIT STYLE</label>
                    <input onChange={() => {
                      setAllAtOnce(!allAtOnce)
                    }} checked={!allAtOnce} id='roundRobin' value='Round robin' type="checkbox"/>
                    <div className="fakeCheckbox">CIRCUIT STYLE</div>
                  </div>
                </div>
                <div className='column'>
                  <div className="checkboxWrapper">
                    <label className="checkboxLabel" htmlFor='allAtOnce'>FINISH ALL ROUNDS OF ONE EXERCISE BEFORE MOVING ONTO THE NEXT EXERCISE</label>
                    <input onChange={() => {
                      setAllAtOnce(!allAtOnce);
                    }} checked={allAtOnce} id='allAtOnce' value='All at once' type="checkbox"/>
                    <div className="fakeCheckbox">FINISH ALL ROUNDS OF ONE EXERCISE BEFORE MOVING ONTO THE NEXT EXERCISE</div>
                  </div>
                </div>
              </>}
            </div>
            <div className="row muscleRow">
              <label>
                {bodyweightOnly && "Turn up the volume and let's go!"}
                {singleWeightOnly && "Grab your dumbbell, turn up the volume, and let's go!"}
                {!bodyweightOnly && !singleWeightOnly && "Grab your dumbbells, turn up the volume, and let's go!"}
              </label>
            </div>
          </div>
        </div>
      </>
    )
  }
}
