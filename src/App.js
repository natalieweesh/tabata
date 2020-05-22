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
    },
    {
      title: 'skull crusher',
      img: gif3
    },
    {
      title: 'tricep pushup',
      img: gif3
    },
    {
      title: 'tricep extension',
      img: gif3
    },
    {
      title: 'pike pushup',
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
    },
    {
      title: 'squat jump',
      img: gif6
    },
    {
      title: 'jumping jack',
      img: gif6
    }
  ],
  butt: [
    {
      title: 'glute bridge',
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
    {
      title: 'fire hydrant',
      img: gif9
    },
    {
      title: 'tabletop kick back',
      img: gif9
    },
    {
      title: 'glute bridge walk out',
      img: gif9
    }
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
    },
    {
      title: 'wide grip pushup',
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
    },
    {
      title: 'i-t-y',
      img: gif9
    },
    {
      title: 'row',
      img: gif9
    }
  ],
  core: [
    {
      title: 'plank jack',
      img: gif8
    },
    {
      title: 'mountain climber',
      img: gif8
    },
    {
      title: 'bear plank',
      img: gif8
    },
    {
      title: 'standing side crunch',
      img: gif8
    }
  ]
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`
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
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState(['arms', 'legs', 'butt', 'back'])
  const [currentIntervalCount, setCurrentIntervalCount] = useState(3);
  // const rounds = Math.floor(totalTime / (workTime + restTime))
  const [rounds, setRounds] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

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
      setCurrentIntervalCount(restTime);
    }
    timer.current = setTimeout(() => {
      // setTheTime(theTime + 1)
      if (currentRound * (workTime + restTime) + restTime === theTime + 1) { // start work (after rest is done)
        setTheTime(theTime + 1)
        setResting(false)
        setCurrentIntervalCount(workTime)
      } else if (theTime+1 === (rounds) * (workTime + restTime)) { // finished with whole workout
        setTheTime(theTime + 1)
        setFinished(true);
        return;
      } else if ((currentRound + 1) * (workTime + restTime) === theTime+1) { // start next round, start new exercise
        setTheTime(theTime + 1)
        setResting(true)
        setCurrentRound(currentRound + 1)
        const newIndex = ((exerciseIndex + 1) % (selectedMuscleGroups.length))
        setExerciseIndex(newIndex)
        const newMuscleGroup = selectedMuscleGroups[newIndex]
        setCurrentExercise(exercises[newMuscleGroup][Math.floor(Math.random() * selectedMuscleGroups[newIndex].length)])
        setCurrentIntervalCount(restTime)
      } else {
        setTheTime(theTime + 1)
        setCurrentIntervalCount(currentIntervalCount - 1)
      }
    }, 1000)
  }, [finished, paused, theTime, currentRound, rounds, currentExercise, exerciseIndex, selectedMuscleGroups, restTime, totalTime, workTime, currentIntervalCount])
  return (
    <div className="App">
      {!startedWorkout && <p className="exerciseTitle">It's tabata time!</p>}
      {!startedWorkout &&
      <div className="settingsRow">
        <div className="row">
          <div className="column">
            <label>Choose your work time:</label>
            <select className="select-css" onChange={e => {
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
        <div>
          <div className="row muscleRowTitle">
            <label>Select the muscle groups to focus on:</label>
          </div>
          <div className="row muscleRow">
              {Object.keys(exercises).map(muscle => {
                return <div className="checkboxWrapper">
                  <label className="checkboxLabel" htmlFor={muscle}>{muscle}</label><input onChange={() => {
                    if (selectedMuscleGroups.includes(muscle)) {
                      setSelectedMuscleGroups(selectedMuscleGroups.filter(x => x !== muscle))
                    } else {
                      setSelectedMuscleGroups(selectedMuscleGroups.concat([muscle]))
                    }
                  }} checked={selectedMuscleGroups.includes(muscle)} id={muscle} value={muscle} type="checkbox"/><div className="fakeCheckbox">{muscle.toUpperCase()}</div>
                </div>
              })}
          </div>
        </div>
      </div>
      }


      {currentExercise && (
        <div>
          <div className="row progressRow">
            <div className="progressBar"><div className="fill" style={{width: `${parseInt(theTime / ((restTime + workTime) * rounds) * 100)}%`}}></div></div>
          </div>
          <div className="row mainRow">
            <div className="column">
              <p className="exerciseTitle">{currentExercise && currentExercise['title']}</p>
              <img src={currentExercise && currentExercise['img']} alt="hello" />
              <p>[work your {selectedMuscleGroups[exerciseIndex]}]</p>
            </div>
            <div className="column">
              <p className={resting ? 'restText' : 'workText'}>{resting ? "REST" : "WORK"}</p>
              <p className="countdown">{currentIntervalCount >= 0 ? currentIntervalCount : ""}</p>
          </div>
        </div>
          <div className="row">
            <div className="column">
              <p>Time elapsed: {formatTime(theTime)}</p>
            </div>
          </div>
        </div>
      )}

      {finished && <div>
        <p className="exerciseTitle">YOU FINISHED!</p>
        <p>Total workout time: {formatTime(theTime)}</p>
        <p>Total rounds finished: {currentRound + 1}</p>
      </div>}

      {!finished &&
      <div className="row">
        <button onClick={() => {
          setPaused(!paused)
          if (!startedWorkout) {
            setStartedWorkout(true);
          }
        }} className={startedWorkout && !paused ? 'unpausedButton' : ''}>{!startedWorkout ? ("START") : (paused ? "UNPAUSE" : "PAUSE")}</button>
        <button className="previewButton" onClick={() => {
          setShowPreview(!showPreview)
        }}>{showPreview ? 'Hide the exercises' : 'Preview the exercises'}</button>
      </div>
      }

      
      {showPreview && !startedWorkout &&
        <div className="row">
          {Object.keys(exercises).map(muscle => {
            return <div>
              <p className="exerciseTitle">exercises for your {muscle}:</p>
              <div className="row">
              {exercises[muscle].map(exercise => {
                return <div className="column"><p>{exercise['title']}</p><img src={exercise['img']} alt={exercise['title']}/></div>
              })}
              </div>
            </div>
          })}
        </div>
      }

      {/* <p>rounds: {rounds}</p>
      <p>current round: {currentRound + 1}</p>
      <p>paused: {paused ? "true" : "false"}</p>
      <p>resting: {resting ? "resting" : "working"}</p>
      <p>finished? {finished ? "finished!" : "not yet"}</p>
      <p>exercise index: {exerciseIndex}</p> */}
      
    </div>
  )
};

export default App;
