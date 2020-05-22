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
    }
  ]
}

function App() {
  const muscleGroups = ['arms', 'legs', 'butt']
  const workTime = 5;
  const restTime = 3;
  const totalTime = 38; //testing with 60 seconds
  const rounds = Math.floor(totalTime / (workTime + restTime))
  const timer = useRef(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [resting, setResting] = useState(true);
  const [paused, setPaused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [theTime, setTheTime] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(null);

  useEffect(() => {
    if (paused || finished) {
      clearTimeout(timer.current);
      if (finished) {
        setCurrentExercise(null)
      }
      return;
    }
    if (!currentExercise) {
      const currentMuscleGroup = muscleGroups[exerciseIndex];
      setCurrentExercise(exercises[currentMuscleGroup][0])
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
        const newIndex = ((exerciseIndex + 1) % (muscleGroups.length))
        setExerciseIndex(newIndex)
        const newMuscleGroup = muscleGroups[newIndex]
        setCurrentExercise(exercises[newMuscleGroup][0])
      }
    }, 1000)
  }, [finished, paused, theTime, currentRound, rounds, currentExercise, exerciseIndex, muscleGroups])
  return (
    <div className="App">
      <p>hello</p>
      <button onClick={() => setPaused(!paused)}>{paused ? "UN" : ""}PAUSE</button>
      <p>time: {theTime}</p>
      <p>rounds: {rounds}</p>
      <p>current round: {currentRound + 1}</p>
      <p>paused: {paused ? "true" : "false"}</p>
      <p>resting: {resting ? "resting" : "working"}</p>
      <p>finished? {finished ? "finished!" : "not yet"}</p>
      <p>exercise index: {exerciseIndex}</p>
      {currentExercise && (
        <div>
        <p>current exercise: {currentExercise && currentExercise['title']}</p>
        <img src={currentExercise && currentExercise['img']} alt="hello" />
        </div>
      )}
    </div>
  );
}

export default App;
