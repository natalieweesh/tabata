import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import gif1 from './gifs/testgif1.gif';
import gif2 from './gifs/testgif2.gif';
import gif3 from './gifs/testgif3.gif';
import gif4 from './gifs/testgif4.gif';
import gif5 from './gifs/testgif5.gif';
import gif6 from './gifs/testgif6.gif';
import gif7 from './gifs/testgif7.gif';
import gif8 from './gifs/testgif8.gif';
import gif9 from './gifs/testgif9.gif';

const exercises = {
  arms: [
    {
      title: 'bicep curl',
      img: gif1
    },
    {
      title: 'tricep dip',
      img: gif2
    },
    {
      title: 'hammer curl',
      img: gif3
    }
  ],
  legs: [
    {
      title: 'squat',
      img: gif4
    },
    {
      title: 'bulgarian split squat',
      img: gif5
    },
    {
      title: 'reverse lunge',
      img: gif6
    }
  ],
  butt: [
    {
      title: 'bridge',
      img: gif7
    },
    {
      title: 'deadlift',
      img: gif8
    },
    {
      title: 'sumo squat',
      img: gif9
    },
  ],
  chest: [
    {
      title: 'chest fly',
      img: gif4
    },
    {
      title: 'chest press',
      img: gif5
    },
    {
      title: 'reverse fly',
      img: gif6
    }
  ],
  back: [
    {
      title: 'upright row',
      img: gif7
    },
    {
      title: 'superman',
      img: gif8
    },
    {
      title: 'pull up',
      img: gif9
    }
  ]
}

function App() {
  // const muscleGroups = ['arms', 'legs', 'butt']
  // const workTime = 5;
  // const restTime = 3;
  // const totalTime = 38; //testing with 60 seconds
  const timer = useRef(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [resting, setResting] = useState(true);
  const [paused, setPaused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [theTime, setTheTime] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [startedWorkout, setStartedWorkout] = useState(false);
  const [workTime, setWorkTime] = useState(5)
  const [restTime, setRestTime] = useState(3)
  const [totalTime, setTotalTime] = useState(38)
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState(['arms', 'legs', 'butt'])
  // const rounds = Math.floor(totalTime / (workTime + restTime))
  const [rounds, setRounds] = useState(null);

  useEffect(() => {
    if (paused || finished) {
      clearTimeout(timer.current);
      if (finished) {
        setCurrentExercise(null)
      }
      return;
    }
    if (!selectedMuscleGroups || selectedMuscleGroups.length === 0) {
      setSelectedMuscleGroups(['arms', 'legs', 'chest', 'butt', 'back']) // if they selected no muscle groups use them all
      return;
    }
    if (!rounds) {
      setRounds(Math.floor(totalTime / (workTime + restTime)))
    }
    if (!currentExercise) { // starting the first exercise of the workout
      const currentMuscleGroup = selectedMuscleGroups[exerciseIndex];
      setCurrentExercise(exercises[currentMuscleGroup][Math.floor(Math.random() * selectedMuscleGroups[exerciseIndex].length)])
    }
    timer.current = setTimeout(() => {
      setTheTime(theTime + 1)
      if (currentRound * (workTime + restTime) + restTime === theTime) { // start work (after rest is done)
        setResting(false)
      } else if (theTime+1 === (rounds) * (workTime + restTime)) { // finished with whole workout
        setFinished(true);
        return;
      } else if ((currentRound + 1) * (workTime + restTime) === theTime) { // start next round, start new exercise
        setResting(true)
        setCurrentRound(currentRound + 1)
        const newIndex = ((exerciseIndex + 1) % (selectedMuscleGroups.length))
        setExerciseIndex(newIndex)
        const newMuscleGroup = selectedMuscleGroups[newIndex]
        setCurrentExercise(exercises[newMuscleGroup][Math.floor(Math.random() * selectedMuscleGroups[newIndex].length)])
      }
    }, 1000)
  }, [finished, paused, theTime, currentRound, rounds, currentExercise, exerciseIndex, selectedMuscleGroups, restTime, totalTime, workTime])
  return (
    <div className="App">
      <p>It's workout time!</p>
      {!startedWorkout &&
      <div>
        <div className="row">
          <div className="column">
            <label>Choose your work time:</label>
            <select className="select-css" onChange={e => {
              console.log('hello')
              console.log(e.target.value)
              setWorkTime(parseInt(e.target.value))
            }}>
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
            <select className="select-css" onChange={e => setRestTime(parseInt(e.target.value))}>
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
            <select className="select-css" onChange={e => setTotalTime(parseInt(e.target.value))}>
              <option value="30">30 seconds</option>
              <option value="60">1 minute</option>
              <option value="300">5 minutes</option>
              <option value="600">10 minutes</option>
              <option value="900">15 minutes</option>
              <option value="1200">20 minutes</option>
              <option value="1500">25 minutes</option>
              <option value="1800">30 minutes</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="checkboxWrapper">
            <label className="checkboxLabel" htmlFor="arms">Arms</label><input onChange={() => {
              if (selectedMuscleGroups.includes('arms')) {
                setSelectedMuscleGroups(selectedMuscleGroups.filter(x => x !== 'arms'))
              } else {
                setSelectedMuscleGroups(selectedMuscleGroups.concat(['arms']))
              }
            }} checked={selectedMuscleGroups.includes('arms')} id="arms" value="arms" type="checkbox"/><div className="fakeCheckbox">Arms</div>
          </div>
          <div className="checkboxWrapper">
            <label className="checkboxLabel" htmlFor="legs">Legs</label><input onChange={() => {
              if (selectedMuscleGroups.includes('legs')) {
                setSelectedMuscleGroups(selectedMuscleGroups.filter(x => x !== 'legs'))
              } else {
                setSelectedMuscleGroups(selectedMuscleGroups.concat(['legs']))
              }
            }} checked={selectedMuscleGroups.includes('legs')} id="legs" value="legs" type="checkbox"/><div className="fakeCheckbox">Legs</div>
          </div>
          <div className="checkboxWrapper">
            <label className="checkboxLabel" htmlFor="chest">Chest</label><input onChange={() => {
              if (selectedMuscleGroups.includes('chest')) {
                setSelectedMuscleGroups(selectedMuscleGroups.filter(x => x !== 'chest'))
              } else {
                setSelectedMuscleGroups(selectedMuscleGroups.concat(['chest']))
              }
            }} checked={selectedMuscleGroups.includes('chest')} id="chest" value="chest" type="checkbox"/><div className="fakeCheckbox">Chest</div>
          </div>
          <div className="checkboxWrapper">
            <label className="checkboxLabel" htmlFor="butt">Butt</label><input onChange={() => {
              if (selectedMuscleGroups.includes('butt')) {
                setSelectedMuscleGroups(selectedMuscleGroups.filter(x => x !== 'butt'))
              } else {
                setSelectedMuscleGroups(selectedMuscleGroups.concat(['butt']))
              }
            }} checked={selectedMuscleGroups.includes('butt')} id="butt" value="butt" type="checkbox"/><div className="fakeCheckbox">Butt</div>
          </div>
          <div className="checkboxWrapper">
            <label className="checkboxLabel" htmlFor="back">Back</label><input onChange={() => {
              if (selectedMuscleGroups.includes('back')) {
                setSelectedMuscleGroups(selectedMuscleGroups.filter(x => x !== 'back'))
              } else {
                setSelectedMuscleGroups(selectedMuscleGroups.concat(['back']))
              }
            }} checked={selectedMuscleGroups.includes('back')} id="back" value="back" type="checkbox"/><div className="fakeCheckbox">Back</div>
          </div>
        </div>
      </div>
      }

      {currentExercise && (
        <div>
        <p>current exercise: {currentExercise && currentExercise['title']} [{selectedMuscleGroups[exerciseIndex]}]</p>
        <img src={currentExercise && currentExercise['img']} alt="hello" />
        </div>
      )}

      {finished && "YOU FINISHED!"}

        {!finished &&
      <div className="row">
        <button onClick={() => {
          setPaused(!paused)
          if (!startedWorkout) {
            setStartedWorkout(true);
          }
        }}>{!startedWorkout ? ("START") : (paused ? "UNPAUSE" : "PAUSE")}</button>
      </div>
      }
      <p>time: {theTime}</p>
      <p>rounds: {rounds}</p>
      <p>current round: {currentRound + 1}</p>
      <p>paused: {paused ? "true" : "false"}</p>
      <p>resting: {resting ? "resting" : "working"}</p>
      <p>finished? {finished ? "finished!" : "not yet"}</p>
      <p>exercise index: {exerciseIndex}</p>
      
    </div>
  );
}

export default App;
