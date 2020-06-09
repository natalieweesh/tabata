import React, { useState, useEffect, useRef } from 'react';
import { exercises } from './exercises';
import DataSection from './Components/DataSection';
import Settings from './Components/Settings';
import FinishedSection from './Components/FinishedSection';
import FullScreenButton from './Components/FullScreenButton';
import PreviewSection from './Components/PreviewSection';
import ActiveWorkoutSection from './Components/ActiveWorkoutSection';
import FAQSection from './Components/FAQSection';
import BigButtons from './Components/BigButtons';
import './App.css';

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`
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
  const [subrounds, setSubrounds] = useState(1);
  const [allAtOnce, setAllAtOnce] = useState(false);
  let subroundTemplate = useRef([]);
  let exerciseRandomizer = useRef(null);
  let masterList = useRef([]);

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

  const generateExerciseList = () => {
    const subroundLength = Math.floor(rounds.current / subrounds);
    const extraSubround = rounds.current % subrounds !== 0;
    const extraSubroundLength = rounds.current % subrounds;
    console.log(
      'rounds', rounds.current,
      'subround length', subroundLength,
      'extra subround?', !!extraSubround,
      'extra subround length', extraSubroundLength
    )
    let muscleIndex = 0;
    for (let i=0; i < subroundLength; i++) {
      let currentMuscleGroup = selectedMuscleGroups[muscleIndex];
      if (exerciseRandomizer.current[currentMuscleGroup]['selector'].length === 0) {
        exerciseRandomizer.current[currentMuscleGroup]['selector'] = exerciseRandomizer.current[currentMuscleGroup]['template']
      }
      if (exerciseRandomizer.current[currentMuscleGroup]['selector'].length > 0) {
        let randomi = Math.floor(Math.random() * exerciseRandomizer.current[currentMuscleGroup]['selector'].length)
        let idx = exerciseRandomizer.current[currentMuscleGroup]['selector'][randomi]
        let pushMe = exercises[currentMuscleGroup][idx];
        pushMe['muscle'] = currentMuscleGroup;
        subroundTemplate.current.push(pushMe)
        exerciseRandomizer.current[currentMuscleGroup]['selector'] = exerciseRandomizer.current[currentMuscleGroup]['selector'].slice(0, randomi).concat(exerciseRandomizer.current[currentMuscleGroup]['selector'].slice(randomi+1))
      }
      muscleIndex = (muscleIndex + 1) % selectedMuscleGroups.length;
    }
    if (subrounds !== 1 && allAtOnce) {
      for (let j = 0; j < subroundLength; j++) {
        for (let k=0; k < subrounds; k++) {
          masterList.current.push(subroundTemplate.current[j])
        }
        if (extraSubround && j >= subroundLength - extraSubroundLength) {
          masterList.current.push(subroundTemplate.current[j])
        }
      }
    } else {
      for (let j = 0; j < subrounds; j++) {
        masterList.current = masterList.current.concat(subroundTemplate.current)
      }
      if (extraSubround) {
        masterList.current = masterList.current.concat(subroundTemplate.current.slice(0, extraSubroundLength))
      }
    }
    console.log('subround template!', subroundTemplate.current)
    console.log('master list!', masterList.current)
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
    return <DataSection allExercises={allExercises} tableRows={tableRows} trainerTableRows={trainerTableRows} />
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
      generateExerciseList();
      currentExercise.current = masterList.current[exerciseIndex.current]
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
        exerciseIndex.current = exerciseIndex.current + 1;
        currentExercise.current = masterList.current[exerciseIndex.current];
        currentIntervalCount.current = restTime
        speak(`${randomPhrase()}. ${currentExercise.current['title']} is next`, 1000)
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
  }, [paused, restTime, totalTime, workTime, theTime, finished, selectedMuscleGroups]);

  return (
    <div className="App">
      {fullScreenable && <FullScreenButton
        fullScreenOn={fullScreenOn}
        setFullScreenOn={setFullScreenOn}
      />}

      {!startedWorkout && <Settings
        setWorkTime={setWorkTime} workTime={workTime}
        setRestTime={setRestTime} restTime={restTime}
        setTotalTime={setTotalTime} totalTime={totalTime}
        selectedMuscleGroups={selectedMuscleGroups} setSelectedMuscleGroups={setSelectedMuscleGroups}
        bodyweightOnly={bodyweightOnly} setBodyweightOnly={setBodyweightOnly}
        subrounds={subrounds} setSubrounds={setSubrounds}
        singleWeightOnly={singleWeightOnly} setSingleWeightOnly={setSingleWeightOnly}
        allAtOnce={allAtOnce} setAllAtOnce={setAllAtOnce}
        lowImpact={lowImpact} setLowImpact={setLowImpact}
      />}

      {currentExercise.current && !finished && <ActiveWorkoutSection
        resting={resting}
        currentExercise={currentExercise}
        currentIntervalCount={currentIntervalCount}
        theTime={theTime}
        formatTime={formatTime}
        restTime={restTime}
        workTime={workTime}
        rounds={rounds}
        selectedMuscleGroups={selectedMuscleGroups}
        exerciseIndex={exerciseIndex}
      />}

      {!currentExercise.current && startedWorkout && !finished &&
        <div>
          <div className="row progressRow">
            <div className="progressBar"><div className="fill" style={{width: `${parseInt(theTime / ((restTime + workTime) * rounds.current) * 100)}%`}}></div></div>
          </div>
          <div className="row restText mainRow"><p className="exerciseTitle centerize">Turn up the volume!<br/><br/>Let's get ready to rumble...</p></div>
        </div>
      }

      {finished && <FinishedSection
        formatTime={formatTime}
        theTime={theTime}
        currentRound={currentRound}
        subroundTemplate={subroundTemplate}
      />}

      {!finished && <BigButtons
        setPaused={setPaused}
        paused={paused}
        setStartedWorkout={setStartedWorkout}
        startedWorkout={startedWorkout}
        setShowPreview={setShowPreview}
        showPreview={showPreview}
        setShowFAQ={setShowFAQ}
        showFAQ={showFAQ}
      />}
      
      {showPreview && !startedWorkout && <PreviewSection printExerciseCounts={printExerciseCounts} />}

      {showFAQ && !finished && <FAQSection />}
    </div>
  )
};

export default App;
