import React, { Component } from 'react';
import ReactNoSleep from 'react-no-sleep';

const scrollDown = () => {
  window.scroll(0, window.scrollY + 300);
}

export default class BigButtons extends Component {
  render() {
    const {
      setPaused,
      paused,
      setStartedWorkout,
      startedWorkout,
      setShowPreview,
      showPreview,
      setShowFAQ,
      showFAQ
    } = this.props;
    return <div className="row">
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
        }} className={startedWorkout && !paused ? 'unpausedButton' : ''}>
            {!startedWorkout ? ("START") : (paused ? "UNPAUSE" : "PAUSE")}
        </button>
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
}