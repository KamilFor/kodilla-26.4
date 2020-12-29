import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'off',
      time: 1200,
      timer: null,
    };
  }

  step = () => {
    if (this.state.time === 0) {
      // Zmien status na rest/work
      if (this.state.status === 'work') {
        // Zmien status na rest
        this.setState({
          status: 'rest',
          time: 20,
        });
      } else if (this.state.status === 'rest') {
        // Zmien status na work
        this.setState({
          status: 'work',
          time: 1200,
        });
      }
    } else {
      this.setState({
        time: this.state.time - 1,
      });
    }
  };

  startTimer = () => {
    this.setState({
      status: 'work',
      time: 1200,
      timer: setInterval(this.step, 1000),
    });
  };

  stopTimer = () => {
    this.setState({
      status: 'off',
      time: 1200,
      timer: clearInterval(this.step),
    });
  };

  closeApp = () => {
    window.close();
  };

  formatTime(time) {
    let secounds = time % 60;
    let minuts = Math.floor(time / 60);
    if (secounds < 10) secounds = `0${secounds}`;

    return `${minuts}:${secounds}`;
  }

  render() {
    const { status } = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {status === 'work' && <img src='./images/work.png' />}
        {status === 'rest' && <img src='./images/rest.png' />}
        {status !== 'off' && <div className='timer'>{this.formatTime(this.state.time)}</div>}
        {status === 'off' && (
          <button className='btn' onClick={this.startTimer}>
            Start
          </button>
        )}
        {status !== 'off' && (
          <button className='btn' onClick={this.stopTimer}>
            Stop
          </button>
        )}
        <button className='btn btn-close' onClick={this.closeApp}>
          X
        </button>
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));
