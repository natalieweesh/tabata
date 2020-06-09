import React, { Component } from 'react';

export default class FullScreenButton extends Component {
  render() {
    const { fullScreenOn, setFullScreenOn } = this.props;
    return <button className='fullscreenButton restText' onClick={() => {
      if (fullScreenOn && document.fullscreenElement) {
        document.exitFullscreen()
        setFullScreenOn(false)
      } else {
        document.documentElement.requestFullscreen()
        setFullScreenOn(true)
      }
    }}>Full screen mode</button>
  }
}