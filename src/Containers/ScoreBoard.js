import React, {Component} from 'react';
import { connect } from 'react-redux';
import { setScene } from '../Actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { setAnswer, setNum, setTimer } from '../Actions';
import {red500} from 'material-ui/styles/colors';

class ScoreBoard extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    var countDownTimer = setInterval(() => {
      this.props.setTime(this.props.timer - 1)
    }, 1000);

    setTimeout(() => {
      clearInterval(countDownTimer);
      this.props.newScene("GAMEOVER");
    }, 30000);
    this.props.setProblem(Math.floor(Math.random() * (100 - 1) + 1), Math.floor(Math.random() * (100 - 1) + 1));
  }

  render() {
    return (
      <div
        style={{
          flex:.6,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          color: red500,
          fontWeight: 'bold',
          margin: 20,
        }}
      >
        <div style={{flex: 1}}>
          {this.props.timer}s
        </div>
        <div style={{fontSize: 35, flex:3}}>{this.props.numA} + {this.props.numB}</div>
        <div style={{flex: 1}}>{this.props.score}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    answer: state.app.answer,
    score: state.app.score,
    numA: state.app.numA,
    numB: state.app.numB,
    timer: state.app.timer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setProblem: (numA, numB) => {
      dispatch(setNum(numA, numB))
    },
    setTime: (time) => {
      dispatch(setTimer(time))
    },
    newScene: (scene) => {
      dispatch(setScene(scene))
    }
  }
}

const ConnectedScoreBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreBoard)

export default ConnectedScoreBoard;
