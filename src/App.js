import React, { useState, useEffect, useRef } from 'react';
import ReactNoSleep from 'react-no-sleep';
import { exercises } from './exercises';
import gif from './titleimage.gif';
import './App.css';

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
  const workPhrases = ['time to work', "let's go", 'go go go', "let's get it done", 'begin', "ok go", 'go for it'];
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
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState(['arms', 'legs', 'butt', 'back', 'core'])
  const rounds = useRef(null)
  const [showPreview, setShowPreview] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [bodyweightOnly, setBodyweightOnly] = useState(false);
  const [singleWeightOnly, setSingleWeightOnly] = useState(false);
  const [lowImpact, setLowImpact] = useState(false);
  const fullScreenable = document.fullscreenEnabled;
  const [fullScreenOn, setFullScreenOn] = useState(false);
  let history = useRef([]);
  let exerciseRandomizer = useRef(null);

  const generateExerciseRandomizer = () => {
    const arrays = {}
    Object.keys(exercises).map((muscleGroup) => {
      let template = []
      for (let i = 0; i < exercises[muscleGroup].length; i++) {
        if (bodyweightOnly && !exercises[muscleGroup][i]['bodyweight']) continue;
        if (singleWeightOnly && !(exercises[muscleGroup][i]['singleweight'] || exercises[muscleGroup][i]['bodyweight'])) continue;
        if (lowImpact && !exercises[muscleGroup][i]['lowimpact']) continue;
        template.push(i);
      }
      arrays[muscleGroup] = {
        template: template,
        selector: template
      }
    })
    exerciseRandomizer.current = arrays;
  }

  const printExerciseCounts = () => {
    let TRAINERS = ['poopybutthole', 'meeseeks', 'tina', 'bmo', 'bob', 'spongebob', 'rick', 'louise', 'prince', 'finn', 'jake'];
    const trainerNames = {
      'poopybutthole': 'mr. poopybutthole',
      'meeseeks': 'mr. meeseeks',
      'tina': 'tina belcher',
      'bmo': 'bmo',
      'bob': 'bob belcher',
      'spongebob': 'spongebob squarepants',
      'rick': 'rick sanchez',
      'louise': 'louise belcher',
      'prince': 'the little prince',
      'finn': 'finn the human',
      'jake': 'jake the dog'
    }
    let allExercises = []
    let tableRows = [];
    let trainerTableRows = [];

    Object.keys(exercises).map(muscle => {
      allExercises = allExercises.concat(exercises[muscle])
      let totalExercises = exercises[muscle].length;
      let bodyweightExercises = exercises[muscle].filter(x => x.bodyweight).length;
      let lowimpactExercises = exercises[muscle].filter(x => x.lowimpact).length;
      let newRow = <tr><td>{muscle === 'arms' ? 'arms + chest' : muscle}</td><td>{totalExercises}</td><td>{bodyweightExercises}</td><td>{lowimpactExercises}</td></tr>
      tableRows.push(newRow);
    })
    TRAINERS.map(trainer => {
      let trainerExercises = allExercises.filter(x => x.character === trainer).length
      let newRow = <tr><td>{trainerNames[trainer]}</td><td>{trainerExercises}</td></tr>;
      trainerTableRows.push(newRow)
    })
    return <div>
      <p className='exerciseTitle'>that's {allExercises.length} different exercises for you to do!</p>
      <div className='row statisticsRow'>
        <table className='column'><tbody><tr><td>muscle<br></br>group</td><td>total<br/>exercises</td><td>bodyweight<br/>exercises</td><td>low impact<br/>exercises</td></tr>{tableRows.map(e => e)}</tbody></table>
        <table className='column '><tbody><tr><td>trainer</td><td>total<br/>exercises</td></tr>{trainerTableRows.map(e => e)}</tbody></table>
      </div>
    </div>
  }

  useEffect(() => {
    if (paused || finished) {
      clearTimeout(timer.current);
      if (finished) {
        currentExercise.current = null;
      }
      return;
    }
    if (!selectedMuscleGroups || selectedMuscleGroups.length === 0) {
      setSelectedMuscleGroups(['arms', 'legs', 'butt', 'back', 'core']) // if they selected no muscle groups use them all
      return;
    }
    if (!rounds.current) {
      rounds.current = Math.floor(totalTime / (workTime + restTime))
    }
    if (!currentExercise.current) { // starting the first exercise of the workout
      generateExerciseRandomizer();
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
      history.current.push(currentExercise.current)
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
        history.current.push(currentExercise.current)
      } else {
        if (currentExercise.current['unilateral'] && !resting.current && currentIntervalCount.current === Math.floor(workTime / 2)) {
          const switchSidesPrompts = ['switch sides', 'other side'];
          speak(switchSidesPrompts[Math.floor(Math.random()*switchSidesPrompts.length)])
        }
        if (currentExercise.current['unidirectional'] && !resting.current && currentIntervalCount.current === Math.floor(workTime / 2)) {
          const switchDirectionsPrompts = ['switch directions', 'other direction'];
          speak(switchDirectionsPrompts[Math.floor(Math.random()*switchDirectionsPrompts.length)])
        }
        if (currentIntervalCount.current - 1 >= 0) {
          currentIntervalCount.current = currentIntervalCount.current - 1
        }
      }
    }, 1000)
  }, [paused, restTime, totalTime, workTime, theTime, finished, selectedMuscleGroups])
  return (
    <div className="App">
    {fullScreenable && <button className='fullscreenButton restText' onClick={() => {
      if (fullScreenOn) {
        document.exitFullscreen()
        setFullScreenOn(false)
      } else {
        document.documentElement.requestFullscreen()
        setFullScreenOn(true)
      }
      }}>{fullScreenOn ? 'Exit full screen' : 'Full screen mode'}</button>
    }
      {!startedWorkout && <div><img className="titleImage pageTitle" src={gif} alt="It's Tabata Time!"/></div>}
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
                  <label className="checkboxLabel" htmlFor={muscle}>{muscle === 'arms' ? 'ARMS + CHEST' : 'ARMS'}</label><input onChange={() => {
                    if (selectedMuscleGroups.includes(muscle)) {
                      setSelectedMuscleGroups(selectedMuscleGroups.filter(x => x !== muscle))
                    } else {
                      setSelectedMuscleGroups(selectedMuscleGroups.concat([muscle]))
                    }
                  }} checked={selectedMuscleGroups.includes(muscle)} id={muscle} value={muscle} type="checkbox"/><div className="fakeCheckbox">{muscle === 'arms' ? 'ARMS + CHEST' : muscle.toUpperCase()}</div>
                </div>
              })}
          </div>
        </div>
        <div>
          <div className="row">
            <label>Extra options:</label>
          </div>
          <div className="row muscleRow">
            <div className="checkboxWrapper"><label className="checkboxLabel" htmlFor='bodyweight'>BODYWEIGHT ONLY</label><input onChange={() => {
              setBodyweightOnly(!bodyweightOnly);
              setSingleWeightOnly(false);
            }} checked={bodyweightOnly} id='bodyweight' value='Bodyweight only' type="checkbox"/><div className="fakeCheckbox">BODYWEIGHT ONLY</div></div>
            <div className="checkboxWrapper"><label className="checkboxLabel" htmlFor='singleweight'>I ONLY HAVE 1 DUMBBELL</label><input onChange={() => {
              setSingleWeightOnly(!singleWeightOnly);
              setBodyweightOnly(false);
            }} checked={singleWeightOnly} id='singleweight' value='Singleweight only' type="checkbox"/><div className="fakeCheckbox">I ONLY HAVE 1 DUMBBELL</div></div>
            <div className="checkboxWrapper"><label className="checkboxLabel" htmlFor='lowimpact'>LOW IMPACT</label><input onChange={() => {
              setLowImpact(!lowImpact);
            }} checked={lowImpact} id='lowimpact' value='Low impact' type="checkbox"/><div className="fakeCheckbox">LOW IMPACT</div></div>
          </div>
          <label>{bodyweightOnly && "Turn up the volume and let's go!"}{singleWeightOnly && "Grab your dumbbell, turn up the volume, and let's go!"}{!bodyweightOnly && !singleWeightOnly && "Grab your dumbbells, turn up the volume, and let's go!"}</label>
        </div>
      </div>
      }

      {currentExercise.current && !finished && (
        <div>
          <div className="row progressRow">
            <div className="progressBar"><div className="fill" style={{width: `${parseInt(theTime / ((restTime + workTime) * rounds.current) * 100)}%`}}></div></div>
          </div>
          <div className={resting.current ? 'restText row mainRow' : 'workText row mainRow'}>
            <div className="column bigger">
              <p className="exerciseTitle">{currentExercise.current && currentExercise.current['title']}</p>
              <img src={currentExercise.current && currentExercise.current['img']} alt={currentExercise.current && currentExercise.current['title']} />
              <p>[work your {selectedMuscleGroups[exerciseIndex.current] === 'arms' ? 'arms / chest' : selectedMuscleGroups[exerciseIndex.current]}]</p>
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
      )}

      {!currentExercise.current && startedWorkout && !finished && <div><div className="row progressRow">
            <div className="progressBar"><div className="fill" style={{width: `${parseInt(theTime / ((restTime + workTime) * rounds.current) * 100)}%`}}></div></div>
          </div><div className="row restText mainRow"><p className="exerciseTitle centerize">Turn up the volume!<br/><br/>Let's get ready to rumble...</p></div></div>}

      {finished && <div>
        <p className="exerciseTitle">YOU FINISHED!</p>
        <img src="https://media.giphy.com/media/ZY8BVlXHZqMal62QS3/giphy.gif" alt="it's peanut butter jelly time" />
        <p>Total workout time: {formatTime(theTime)}</p>
        <p>Total rounds finished: {currentRound.current + 1}</p>
        <p className="exerciseTitle">Look at all the exercises you did!</p>
        <div className="row previewRow">
          {history.current.map(e => {
            return <div className="column">
              <p>{e.title}</p>
              <div className="previewImageWrapper">
                <img src={e.img} alt={e.title}/>
              </div>
            </div>
          })}
        </div>
      </div>}

      {!finished &&
      <div className="row">
        <ReactNoSleep className="fulscreenButton">
          {({ isOn, enable, disable }) => (
            <button onClick={() => {
              setPaused(!paused)
              if (!startedWorkout) {
                setStartedWorkout(true);
                setTimeout(window.scroll(0, 0), 200);
              }
              if (!isOn) {
                enable();
              }
            }} className={startedWorkout && !paused ? 'unpausedButton' : ''}>{!startedWorkout ? ("START") : (paused ? "UNPAUSE" : "PAUSE")}</button>
          )}
        </ReactNoSleep>
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
              <p className="exerciseTitle">exercises for your {muscle === 'arms' ? 'arms + chest' : muscle}:</p>
              <div className="row previewRow" id={`${muscle}-previews`}>
              {exercises[muscle].map(exercise => {
                return <div className="column"><p>{exercise['title']}</p><div className="previewImageWrapper">{exercise['bodyweight'] && <div className='bodyweightBanner'>Bodyweight</div>}<img src={exercise['img']} alt={exercise['title']}/></div></div>
              })}
              </div>
            </div>
          })}
          <div>{printExerciseCounts()}</div>
        </div>
      }

      {showFAQ && <div className="row previewRow faq">
        <p><strong>What the squanch is tabata?</strong><br/>Tabata is a type of HIIT workout where you exercise for 20 seconds, rest for 10 seconds, then repeat until your heart falls out.</p>
        <p><strong>Who are your trainers?</strong><br/>Mr. Poopybutthole, Mr. Meeseeks, Tina Belcher, Spongebob Squarepants, BMO, Bob Belcher, The Little Prince, Rick Sanchez, Louise Belcher, Jake the Dog, and Finn the Human are some of our distinguished trainers who will be working out with you today. Please note that their form while doing exercises is not always 100% on point so don't hurt yourself trying to copy them exactly.</p>
        <p><strong>How does this all work?</strong><br/>Once you pick your preferred work time, rest time, and total workout duration, you can choose the muscle groups you want to focus on for your workout. Then the workout will cycle through each muscle group with a different random exercise each time until your total workout time runs out. Let's get schwifty!</p>
        <p><strong>Who lives in a pineapple under the sea?</strong><br/>Spongebob Squarepants</p>
      </div>}
    </div>
  )
};

export default App;
