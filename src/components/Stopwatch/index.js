import {Component} from 'react'

import './index.css'

const initialState = {
  currentMinutes: 0,
  currentSeconds: 0,
  isTimerRunning: false,
}

class Stopwatch extends Component {
  state = initialState

  onStartingStopwatchTimer = () => {
    const {isTimerRunning} = this.state

    if (!isTimerRunning) {
      this.setState({isTimerRunning: true})
      this.timerId = setInterval(this.currentTimer, 1000)
    }
  }

  onPauseStopwatchTimer = () => {
    clearInterval(this.timerId)
    this.setState({isTimerRunning: false})
  }

  onResetStopwatchTimer = () => {
    this.setState(initialState)
    clearInterval(this.timerId)
  }

  onChangeMinutes = (prevMins, prevSecs) => {
    if (prevSecs === 59) {
      return prevMins + 1
    }
    return prevMins
  }

  onChangeSeconds = (prevMins, prevSecs) => {
    if (prevSecs === 59) {
      return 0
    }
    return prevSecs + 1
  }

  currentTimer = () => {
    this.setState(prevState => ({
      currentMinutes: this.onChangeMinutes(
        prevState.currentMinutes,
        prevState.currentSeconds,
      ),
      currentSeconds: this.onChangeSeconds(
        prevState.currentMinutes,
        prevState.currentSeconds,
      ),
    }))
  }

  getStopwatchTimer = () => {
    const {currentMinutes, currentSeconds} = this.state
    const stringifiedMinutes =
      currentMinutes > 9 ? currentMinutes : `0${currentMinutes}`
    const stringifiedSeconds =
      currentSeconds > 9 ? currentSeconds : `0${currentSeconds}`

    return (
      <h1 className="current-timer-text">
        {' '}
        {stringifiedMinutes}:{stringifiedSeconds}
      </h1>
    )
  }

  getStopwatchControlButton = () => {
    const {currentMinutes, currentSeconds} = this.state
    return (
      <div className="stopwatch-controls-container">
        <button
          type="button"
          className="start-button custom-button"
          onClick={this.onStartingStopwatchTimer}
        >
          {' '}
          Start{' '}
        </button>
        <button
          type="button"
          className="pause-button custom-button"
          onClick={this.onPauseStopwatchTimer}
        >
          {' '}
          Stop{' '}
        </button>
        <button
          type="button"
          className="reset-button custom-button"
          onClick={this.onResetStopwatchTimer}
        >
          {' '}
          Reset{' '}
        </button>
      </div>
    )
  }

  render() {
    return (
      <div className="stopwatch-bcg-container">
        <h1 className="stopwatch-heading"> Stopwatch </h1>
        <div className="stopwatch-container">
          <div className="timer-label-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt="stopwatch"
              className="stopwatch-timer-image"
            />
            <h1 className="timer-heading"> Timer </h1>
          </div>
          {this.getStopwatchTimer()}
          {this.getStopwatchControlButton()}
        </div>
      </div>
    )
  }
}

export default Stopwatch
