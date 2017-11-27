import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {red500} from 'material-ui/styles/colors';
import GameBoard from './GameBoard';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countDown: 3,
    }
  }

  componentWillMount() {
    var countDownTimer = setInterval(() => {
      this.setState({countDown: this.state.countDown - 1})
    }, 1000);

    setTimeout(function(){ clearInterval(countDownTimer) }, 3000);
  }
  render() {
    return (
      <div className="Game"
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {this.state.countDown > 0 ? (
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
            <div
              key={this.state.countDown}
              style={{
                top: 0,
                left: 0,
                position: 'absolute',
                color: red500,
                fontSize: 200,
                display: 'flex',
                height: '100vh',
                width: '100vw',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {this.state.countDown}
            </div>
          </ReactCSSTransitionGroup>
        ) : (
          <GameBoard />
        )}

      </div>
    );
  }
}

export default Game;
