import React, { Component } from 'react';
import vid from '../withmusic.mp4';

export default class FinishedSection extends Component {
  render() {
    const { formatTime, theTime, currentRound, subroundTemplate, videoPlaying, setVideoPlaying } = this.props;
    return <div>
      <p className="exerciseTitle">YOU FINISHED!</p>
      <div className='videoWrapper' onClick={() => {
        document.getElementById('vid').play();
        setVideoPlaying(!videoPlaying);
      }}>
        <video id="vid" controls>
          <source src={vid} type='video/mp4' />
        </video>
        {!videoPlaying && <img src="https://media.giphy.com/media/ZY8BVlXHZqMal62QS3/giphy.gif" alt="it's peanut butter jelly time" />}
      </div>
      <p>Total workout time: {formatTime(theTime)}</p>
      <p>Total exercises completed: {currentRound.current + 1}</p>
      <p className="exerciseTitle">Look at all the exercises you did!</p>
      <div className="row previewRow">
        {subroundTemplate.current.map(e => {
          return <div className="column">
            <p>{e.title}</p>
            <div className="previewImageWrapper">
              <img src={e.img} alt={e.title}/>
            </div>
          </div>
        })}
      </div>
    </div>
  }
}