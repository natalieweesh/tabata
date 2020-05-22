import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import gif1 from './testgif1.gif';

const videos = {
  arms: [
    {
      title: 'bicep curl'
    },
    {
      title: 'tricep dip'
    },
    {
      title: 'hammer curl'
    }
  ],
  legs: [
    {
      title: 'squat'
    },
    {
      title: 'bulgarian split squat'
    },
    {
      title: 'reverse lunge'
    }
  ],
  butt: [
    {
      title: 'bridge'
    },
    {
      title: 'deadlift'
    },
    {
      title: 'sumo squat'
    }
  ]
}

function App() {
  // const muscleGroups = ['arms', 'legs', 'butt']
  const workTime = 5;
  const restTime = 3;
  const totalTime = 30; //testing with 60 seconds
  const rounds = Math.floor(totalTime / (workTime + restTime))
  const timer = useRef(null);
  const [roundTime, setRoundTime] = useState()
  const [currentRound, setCurrentRound] = useState(0);
  const [resting, setResting] = useState(true);
  const [paused, setPaused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [theTime, setTheTime] = useState(0);
  useEffect(() => {
    if (paused || finished) {
      clearTimeout(timer.current);
      return;
    }
    console.log('use effect', theTime, paused)
    timer.current = setTimeout(() => {
      setTheTime(theTime + 1)
      if (currentRound * (workTime + restTime) + restTime === theTime) {
        setResting(false)
      } else if (theTime+1 === (rounds) * (workTime + restTime)) {
        setFinished(true);
        return;
      } else if ((currentRound + 1) * (workTime + restTime) === theTime) {
        setResting(true)
        setCurrentRound(currentRound + 1)
      }
    }, 1000)
  }, [finished, paused, theTime, currentRound, rounds])
  console.log("HELLO")
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
      <img src={gif1} alt="hello" />
    </div>
  );
}

export default App;
