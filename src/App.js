import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const exercises = {
  arms: [
    {
      title: 'bicep curl',
      img: 'https://media.giphy.com/media/UV4Yi70OhwQ6JwJo7m/giphy.gif'
    },
    {
      title: 'hammer curl',
      img: 'https://media.giphy.com/media/izaYkYoJMnY07WYFzj/giphy.gif'
    },
    {
      title: 'skull crusher',
      img: 'https://media.giphy.com/media/MdjZSDee0C50ZuYlHa/giphy.gif'
    },
    {
      title: 'tricep pushup',
      img: 'https://media.giphy.com/media/KehD7SA2RF4gqHQP8r/giphy.gif'
    },
    {
      title: 'tricep kickback',
      img: 'https://media.giphy.com/media/fvfoHSsvAeUVrrNc33/giphy.gif'
    },
    {
      title: 'pike pushup',
      img: 'https://media.giphy.com/media/eLYEh1IRtaP7oApdCo/giphy.gif'
    },
    {
      title: 'shoulder press',
      img: 'https://media.giphy.com/media/SUtRTnS36VFpC12IrT/giphy.gif'
    }
  ],
  legs: [
    {
      title: 'squat',
      img: 'https://media.giphy.com/media/XEZsDl0zybBbwJQV07/giphy.gif'
    },
    {
      title: 'bulgarian split squat',
      img: 'https://media.giphy.com/media/YqhMwl3nSuA2Dr3i5v/giphy.gif'
    },
    {
      title: 'reverse lunge',
      img: 'https://media.giphy.com/media/QWR3SDoEL6ggzL9rub/giphy.gif'
    },
    {
      title: 'squat jump',
      img: 'https://media.giphy.com/media/dWsKZW6A3PdJnKROMl/giphy.gif'
    },
    {
      title: 'jumping jack',
      img: 'https://media.giphy.com/media/lNWbCKbffqCIzY8RR1/giphy.gif'
    }
  ],
  butt: [
    {
      title: 'glute bridge',
      img: 'https://media.giphy.com/media/cKKAg0wrGRYENJiUei/giphy.gif'
    },
    {
      title: 'deadlift',
      img: 'https://media.giphy.com/media/Yqz7ZokQ0kCs8uaN9E/giphy.gif'
    },
    {
      title: 'sumo squat',
      img: 'https://media.giphy.com/media/emGfboB1RYoSodN7XG/giphy.gif'
    },
    {
      title: 'fire hydrant',
      img: 'https://media.giphy.com/media/YMY5NMCtfOBJXGAtXY/giphy.gif'
    },
    {
      title: 'glute kick back',
      img: 'https://media.giphy.com/media/JPy2RNHCXbbLGw59pV/giphy.gif'
    },
    {
      title: 'glute bridge walk out',
      img: 'https://media.giphy.com/media/cir6FkDe7MXgmffNcd/giphy.gif'
    }
  ],
  chest: [
    {
      title: 'chest fly',
      img: 'https://media.giphy.com/media/LOXDvvmMvnk33n12pC/giphy.gif'
    },
    {
      title: 'chest press',
      img: 'https://media.giphy.com/media/d8FZU70Rkj1LGIImBB/giphy.gif'
    },
    {
      title: 'reverse fly',
      img: 'https://media.giphy.com/media/kfvD2clhN8AaM7P4L5/giphy.gif'
    },
    {
      title: 'wide grip pushup',
      img: 'https://media.giphy.com/media/iFt57qzEXZisX6JcZ7/giphy.gif'
    }
  ],
  back: [
    {
      title: 'upright row',
      img: 'https://media.giphy.com/media/h7tvdrSjSzmB3XUPgH/giphy.gif'
    },
    {
      title: 'superman',
      img: 'https://media.giphy.com/media/lTArkNAXA1Dk9b4PsX/giphy.gif'
    },
    {
      title: 'i-t-y',
      img: 'https://media.giphy.com/media/Wp0gT1ibDsmUU5KmHm/giphy.gif'
    },
    {
      title: 'row',
      img: 'https://media.giphy.com/media/cmg3rpWI915jERDeYY/giphy.gif'
    }
  ],
  core: [
    {
      title: 'plank jack',
      img: 'https://media.giphy.com/media/kegbiTdPMMqUzWb4ub/giphy.gif'
    },
    {
      title: 'mountain climber',
      img: 'https://media.giphy.com/media/W35qtGrrpweU00eLwI/giphy.gif'
    },
    {
      title: 'bear plank',
      img: 'https://media.giphy.com/media/dscqPpbt6z16WJSvkc/giphy.gif'
    },
    {
      title: 'standing side crunch',
      img: 'https://media.giphy.com/media/Q8a7nGMti3uuCFHfF5/giphy.gif'
    }
  ]
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`
}

const scrollDown = () => {
  window.scroll(0, window.scrollY + 300);
}

function App() {
  const timer = useRef(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [resting, setResting] = useState(true);
  const [paused, setPaused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [theTime, setTheTime] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [startedWorkout, setStartedWorkout] = useState(false);
  const [workTime, setWorkTime] = useState(20)
  const [restTime, setRestTime] = useState(10)
  const [totalTime, setTotalTime] = useState(1200)
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState(['arms', 'legs', 'butt', 'back'])
  const [currentIntervalCount, setCurrentIntervalCount] = useState(3);
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
      setSelectedMuscleGroups(['arms', 'legs', 'chest', 'butt', 'back', 'core']) // if they selected no muscle groups use them all
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
      setTheTime(theTime + 1)
      if (currentRound * (workTime + restTime) + restTime === theTime + 1) { // start work (after rest is done)
        setResting(false)
        setCurrentIntervalCount(workTime)
      } else if (theTime+1 === (rounds) * (workTime + restTime)) { // finished with whole workout
        setFinished(true);
        return;
      } else if ((currentRound + 1) * (workTime + restTime) === theTime+1) { // start next round, start new exercise
        setResting(true)
        setCurrentRound(currentRound + 1)
        const newIndex = ((exerciseIndex + 1) % (selectedMuscleGroups.length))
        setExerciseIndex(newIndex)
        const newMuscleGroup = selectedMuscleGroups[newIndex]
        setCurrentExercise(exercises[newMuscleGroup][Math.floor(Math.random() * selectedMuscleGroups[newIndex].length)])
        setCurrentIntervalCount(restTime)
      } else {
        if (currentIntervalCount - 1 >= 0) {
          setCurrentIntervalCount(currentIntervalCount - 1)
        }
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
              <img src={currentExercise && currentExercise['img']} alt={currentExercise && currentExercise['title']} />
              <p>[work your {selectedMuscleGroups[exerciseIndex]}]</p>
            </div>
            <div className="column">
              <div className={resting ? 'restText centerize' : 'workText centerize'}>
                <p className='countdownTitle'>{resting ? "REST" : "WORK"}</p>
                <p className="countdown">{currentIntervalCount >= 0 ? currentIntervalCount : ""}</p>
              </div>
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
        <img src="https://media.giphy.com/media/ZY8BVlXHZqMal62QS3/giphy.gif" alt="it's peanut butter jelly time" />
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
        {!startedWorkout && <button className="previewButton" onClick={() => {
          setShowPreview(!showPreview)
          if (!showPreview) setTimeout(scrollDown, 200)
        }}>{showPreview ? 'Hide the exercises' : 'Preview the exercises'}</button>}
      </div>
      }
      
      {showPreview && !startedWorkout &&
        <div className="row">
          {Object.keys(exercises).map(muscle => {
            return <div>
              <p className="exerciseTitle">exercises for your {muscle}:</p>
              <div className="row previewRow">
              {exercises[muscle].map(exercise => {
                return <div className="column"><p>{exercise['title']}</p><img src={exercise['img']} alt={exercise['title']}/></div>
              })}
              </div>
            </div>
          })}
        </div>
      }
    </div>
  )
};

export default App;
