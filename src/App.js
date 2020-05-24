import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const exercises = {
  arms: [
    {
      title: 'bicep curl',
      img: 'https://media.giphy.com/media/UV4Yi70OhwQ6JwJo7m/giphy.gif',
      character: 'meeseeks'
    },
    {
      title: 'skull crusher',
      img: 'https://media.giphy.com/media/MdjZSDee0C50ZuYlHa/giphy.gif',
      character: 'tina'
    },
    {
      title: 'curl + press',
      img: 'https://media.giphy.com/media/Lq1ERaOKq2LEuK7xd1/giphy.gif',
      character: 'spongebob'
    },
    {
      title: 'hammer curl',
      img: 'https://media.giphy.com/media/izaYkYoJMnY07WYFzj/giphy.gif',
      character: 'meeseeks'
    },
    {
      title: 'pike pushup',
      img: 'https://media.giphy.com/media/eLYEh1IRtaP7oApdCo/giphy.gif',
      character: 'tina'
    },
    {
      title: 'tricep dip',
      img: 'https://media.giphy.com/media/W3emLNQKTecUA1POxp/giphy.gif',
      character: 'spongebob'
    },
    {
      title: 'tricep pushup',
      img: 'https://media.giphy.com/media/KehD7SA2RF4gqHQP8r/giphy.gif',
      character: 'meeseeks'
    },
    {
      title: 'shoulder press',
      img: 'https://media.giphy.com/media/SUtRTnS36VFpC12IrT/giphy.gif',
      character: 'tina'
    },
    {
      title: 'tricep kickback',
      img: 'https://media.giphy.com/media/fvfoHSsvAeUVrrNc33/giphy.gif',
      character: 'meeseeks'
    }
  ],
  legs: [
    {
      title: 'jumping jack',
      img: 'https://media.giphy.com/media/lNWbCKbffqCIzY8RR1/giphy.gif',
      character: 'poopybutthole'
    },
    {
      title: 'calf raise',
      img: 'https://media.giphy.com/media/QyhLeRDWoIusTLMyNk/giphy.gif',
      character: 'bmo'
    },
    {
      title: 'squat',
      img: 'https://media.giphy.com/media/XEZsDl0zybBbwJQV07/giphy.gif',
      character: 'tina'
    },
    {
      title: 'reverse lunge',
      img: 'https://media.giphy.com/media/QWR3SDoEL6ggzL9rub/giphy.gif',
      character: 'meeseeks'
    },
    {
      title: 'jumprope',
      img: 'https://media.giphy.com/media/Y1jNTxApOQRfKOJt8k/giphy.gif',
      character: 'bmo'
    },
    {
      title: 'bulgarian split squat',
      img: 'https://media.giphy.com/media/YqhMwl3nSuA2Dr3i5v/giphy.gif',
      unilateral: true,
      character: 'tina'
    },
    {
      title: 'squat jump',
      img: 'https://media.giphy.com/media/dWsKZW6A3PdJnKROMl/giphy.gif',
      character: 'meeseeks'
    }
  ],
  butt: [
    {
      title: 'squat to leg raise',
      img: 'https://media.giphy.com/media/SwNf4vey9bnBLRypko/giphy.gif',
      character: 'bmo'
    },
    {
      title: 'glute kick back',
      img: 'https://media.giphy.com/media/JPy2RNHCXbbLGw59pV/giphy.gif',
      unilateral: true,
      character: 'tina'
    },
    {
      title: 'glute bridge',
      img: 'https://media.giphy.com/media/cKKAg0wrGRYENJiUei/giphy.gif',
      character: 'poopybutthole'
    },
    {
      title: 'deadlift',
      img: 'https://media.giphy.com/media/Yqz7ZokQ0kCs8uaN9E/giphy.gif',
      character: 'meeseeks'
    },
    {
      title: 'fire hydrant',
      img: 'https://media.giphy.com/media/YMY5NMCtfOBJXGAtXY/giphy.gif',
      unilateral: true,
      character: 'tina'
    },
    {
      title: 'sumo squat',
      img: 'https://media.giphy.com/media/emGfboB1RYoSodN7XG/giphy.gif',
      character: 'meeseeks'
    },
    {
      title: 'glute bridge walk out',
      img: 'https://media.giphy.com/media/cir6FkDe7MXgmffNcd/giphy.gif',
      character: 'tina'
    }
  ],
  chest: [
    {
      title: 'chest fly',
      img: 'https://media.giphy.com/media/LOXDvvmMvnk33n12pC/giphy.gif',
      character: 'tina'
    },
    {
      title: 'pullover',
      img: 'https://media.giphy.com/media/Lo03vYJTNH6ouIRr4V/giphy.gif',
      character: 'bmo'
    },
    {
      title: 'chest press',
      img: 'https://media.giphy.com/media/d8FZU70Rkj1LGIImBB/giphy.gif',
      character: 'tina'
    },
    {
      title: 'reverse fly',
      img: 'https://media.giphy.com/media/kfvD2clhN8AaM7P4L5/giphy.gif',
      character: 'tina'
    },
    {
      title: 'wide grip pushup',
      img: 'https://media.giphy.com/media/iFt57qzEXZisX6JcZ7/giphy.gif',
      character: 'tina'
    }
  ],
  back: [
    {
      title: 'superman',
      img: 'https://media.giphy.com/media/lTArkNAXA1Dk9b4PsX/giphy.gif',
      character: 'poopybutthole'
    },
    {
      title: 'upright row',
      img: 'https://media.giphy.com/media/h7tvdrSjSzmB3XUPgH/giphy.gif',
      character: 'tina'
    },
    {
      title: 'i-t-y',
      img: 'https://media.giphy.com/media/Wp0gT1ibDsmUU5KmHm/giphy.gif',
      character: 'meeseeks'
    },
    {
      title: 'row to tricep kickback',
      img: 'https://media.giphy.com/media/fqbSg8AqQ09t09RYsY/giphy.gif',
      unilateral: true,
      character: 'bmo'
    },
    {
      title: 'row',
      img: 'https://media.giphy.com/media/cmg3rpWI915jERDeYY/giphy.gif',
      character: 'tina'
    }
  ],
  core: [
    {
      title: 'bicycle crunch',
      img: 'https://media.giphy.com/media/cKmbHxWIQrs5x4k6ur/giphy.gif',
      character: 'tina'
    },
    {
      title: 'plank jack',
      img: 'https://media.giphy.com/media/kegbiTdPMMqUzWb4ub/giphy.gif',
      character: 'meeseeks'
    },
    {
      title: 'standing side crunch',
      img: 'https://media.giphy.com/media/Q8a7nGMti3uuCFHfF5/giphy.gif',
      unilateral: true,
      character: 'tina'
    },
    {
      title: 'side plank',
      img: 'https://media.giphy.com/media/jq0G0EmNEGYyfhENhA/giphy.gif',
      unilateral: true,
      character: 'bmo'
    },
    {
      title: 'bear plank',
      img: 'https://media.giphy.com/media/dscqPpbt6z16WJSvkc/giphy.gif',
      character: 'tina'
    },
    {
      title: 'mountain climber',
      img: 'https://media.giphy.com/media/W35qtGrrpweU00eLwI/giphy.gif',
      character: 'meeseeks'
    },
    {
      title: 'sit up',
      img: 'https://media.giphy.com/media/TiCqf0dCsS0UiSLWqd/giphy.gif',
      character: 'tina'
    },
    {
      title: 'plank',
      img: 'https://media.giphy.com/media/J2rGWkLU7IS5D2Us7f/giphy.gif',
      character: 'bmo'
    },
    {
      title: 'crunch',
      img: 'https://media.giphy.com/media/J5dtNyZYvFIFFC1fUV/giphy.gif',
      character: 'tina'
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

const speak = (words, timeout = 0) => {
  setTimeout(() => {
    window.responsiveVoice.speak(words)
  }, timeout)
}

const randomPhrase = (work = false) => {
  const workPhrases = ['time to work', 'get to it', 'go go go', "let's get it done", 'begin', "ok go", 'go for it'];
  const restPhrases = ['take a break', 'and rest', 'break time', 'take a breather', 'and stop', 'and break'];
  const phrases = work ? workPhrases : restPhrases;
  return phrases[Math.floor(Math.random() * phrases.length)]
}

function App() {
  const timer = useRef(null);
  const currentIntervalCount = useRef(3);
  const currentRound = useRef(0);
  const resting = useRef(true);
  const [paused, setPaused] = useState(true);
  const [finished, setFinished] = useState(false);
  const [theTime, setTheTime] = useState(0);
  const exerciseIndex = useRef(0);
  const currentExercise = useRef(null);
  const [startedWorkout, setStartedWorkout] = useState(false);
  const [workTime, setWorkTime] = useState(20)
  const [restTime, setRestTime] = useState(10)
  const [totalTime, setTotalTime] = useState(1200)
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState(['arms', 'legs', 'butt', 'back'])
  const rounds = useRef(null)
  const [showPreview, setShowPreview] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const arrays = {}
  Object.keys(exercises).map((muscleGroup) => {
    let template = []
    for (let i = 0; i < exercises[muscleGroup].length; i++) {
      template.push(i);
    }
    arrays[muscleGroup] = {
      template: template,
      selector: template
    }
  })

  let exerciseRandomizer = useRef(arrays);

  useEffect(() => {
    if (paused || finished) {
      clearTimeout(timer.current);
      if (finished) {
        currentExercise.current = null;
      }
      return;
    }
    if (!selectedMuscleGroups || selectedMuscleGroups.length === 0) {
      setSelectedMuscleGroups(['arms', 'legs', 'chest', 'butt', 'back', 'core']) // if they selected no muscle groups use them all
      return;
    }
    if (!rounds.current) {
      rounds.current = Math.floor(totalTime / (workTime + restTime))
    }
    if (!currentExercise.current) { // starting the first exercise of the workout
      const currentMuscleGroup = selectedMuscleGroups[exerciseIndex.current];
      if (exerciseRandomizer.current[currentMuscleGroup]['selector'].length === 0) {
        exerciseRandomizer.current[currentMuscleGroup]['selector'] = exerciseRandomizer.current[currentMuscleGroup]['template']
      }
      if (exerciseRandomizer.current[currentMuscleGroup]['selector'].length > 0) {
        let randomi = Math.floor(Math.random() * exerciseRandomizer.current[currentMuscleGroup]['selector'].length)
        let idx = exerciseRandomizer.current[currentMuscleGroup]['selector'][randomi]
        currentExercise.current = exercises[currentMuscleGroup][idx]
        exerciseRandomizer.current[currentMuscleGroup]['selector'] = exerciseRandomizer.current[currentMuscleGroup]['selector'].slice(0, randomi).concat(exerciseRandomizer.current[currentMuscleGroup]['selector'].slice(randomi+1))
      }
      currentIntervalCount.current = restTime;
      speak(`let's do this! first exercise is ${currentExercise.current['title']}`)
    }
    timer.current = setTimeout(() => {
      setTheTime(theTime + 1)
      if (currentRound.current * (workTime + restTime) + restTime === theTime + 1) { // start work (after rest is done)
        resting.current = false;
        currentIntervalCount.current = workTime
        speak(randomPhrase(true), 1000)
      } else if (theTime + 1 === (rounds.current) * (workTime + restTime)) { // finished with whole workout
        setFinished(true);
        speak("good job! workout complete! it's peanut butter jelly time")
        return;
      } else if ((currentRound.current + 1) * (workTime + restTime) === theTime + 1) { // start next round, start new exercise
        resting.current = true;
        currentRound.current = currentRound.current + 1
        const newIndex = ((exerciseIndex.current + 1) % (selectedMuscleGroups.length))
        exerciseIndex.current = newIndex;
        const newMuscleGroup = selectedMuscleGroups[newIndex]
        console.log(exerciseRandomizer.current[newMuscleGroup]['selector'])
        if (exerciseRandomizer.current[newMuscleGroup]['selector'].length === 0) {
          exerciseRandomizer.current[newMuscleGroup]['selector'] = exerciseRandomizer.current[newMuscleGroup]['template']
        }
        if (exerciseRandomizer.current[newMuscleGroup]['selector'].length > 0) {
          let randomi = Math.floor(Math.random() * exerciseRandomizer.current[newMuscleGroup]['selector'].length)
          let idx = exerciseRandomizer.current[newMuscleGroup]['selector'][randomi]
          currentExercise.current = exercises[newMuscleGroup][idx]
          exerciseRandomizer.current[newMuscleGroup]['selector'] = exerciseRandomizer.current[newMuscleGroup]['selector'].slice(0, randomi).concat(exerciseRandomizer.current[newMuscleGroup]['selector'].slice(randomi+1))
        }
        currentIntervalCount.current = restTime
        speak(`${randomPhrase()}. ${currentExercise.current['title']} is next`, 1000)
      } else {
        if (currentIntervalCount.current - 1 >= 0) {
          currentIntervalCount.current = currentIntervalCount.current - 1
        }
      }
    }, 1000)
  }, [paused, restTime, totalTime, workTime, theTime, finished, selectedMuscleGroups])
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

      {currentExercise.current && !finished && (
        <div>
          <div className="row progressRow">
            <div className="progressBar"><div className="fill" style={{width: `${parseInt(theTime / ((restTime + workTime) * rounds.current) * 100)}%`}}></div></div>
          </div>
          <div className={resting.current ? 'restText row mainRow' : 'workText row mainRow'}>
            <div className="column">
              <p className="exerciseTitle">{currentExercise.current && currentExercise.current['title']}</p>
              <img src={currentExercise.current && currentExercise.current['img']} alt={currentExercise.current && currentExercise.current['title']} />
              <p>[work your {selectedMuscleGroups[exerciseIndex.current]}]</p>
            </div>
            <div className="column">
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
      )}

      {!currentExercise.current && startedWorkout && <div><div className="row progressRow">
            <div className="progressBar"><div className="fill" style={{width: `${parseInt(theTime / ((restTime + workTime) * rounds.current) * 100)}%`}}></div></div>
          </div><div className="row restText mainRow"><p className="exerciseTitle centerize">Let's get ready to rumble...</p></div></div>}

      {finished && <div>
        <p className="exerciseTitle">YOU FINISHED!</p>
        <img src="https://media.giphy.com/media/ZY8BVlXHZqMal62QS3/giphy.gif" alt="it's peanut butter jelly time" />
        <p>Total workout time: {formatTime(theTime)}</p>
        <p>Total rounds finished: {currentRound.current + 1}</p>
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
          setShowFAQ(false)
          if (!showPreview) setTimeout(scrollDown, 200)
        }}>{showPreview ? 'Hide the exercises' : 'Preview the exercises'}</button>}
        <button className="previewButton" onClick={() => {
          setShowFAQ(!showFAQ);
          setShowPreview(false)
          if (!showFAQ) setTimeout(scrollDown, 200)
        }}>{showFAQ ? 'Hide FAQ' : 'FAQ'}</button>
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

      {showFAQ && <div className="row previewRow faq">
        <p><strong>What the squanch is tabata?</strong><br/>Tabata is a type of HIIT workout where you exercise for 20 seconds, rest for 10 seconds, then repeat until your heart falls out.</p>
        
        <p><strong>Who are your trainers?</strong><br/>Mr. Poopybutthole, Mr. Meeseeks, Tina Belcher, Spongebob Squarepants, and BMO are some of our distinguished trainers who will be working out with you today. Please note that their form while doing exercises is not always 100% on point so don't hurt yourself trying to copy them exactly.</p>
        <p><strong>How does this all work?</strong><br/>Once you pick your preferred work time, rest time, and total workout duration, you can choose the muscle groups you want to focus on for your workout. Then the workout will cycle through each muscle group with a different random exercise each time until your total workout time runs out. Let's get schwifty!</p>
        <p><strong>Who lives in a pineapple under the sea?</strong><br/>Spongebob Squarepants</p>
      </div>}
    </div>
  )
};

export default App;
