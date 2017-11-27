import React, {Component} from 'react';
import { connect } from 'react-redux';
import { setScore, setBox, setNum } from '../Actions';
import ScoreBoard from './ScoreBoard';
import FlatButton from 'material-ui/FlatButton';
import {red500} from 'material-ui/styles/colors';

class GameBoard extends Component {
  constructor(props){
    super(props);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  checkAnswer(selectedBox) {
    if (this.props.correctBox === selectedBox) {
      this.props.newScore(this.props.score + 1);
      this.props.setProblem(Math.floor(Math.random() * (100 - 1) + 1), Math.floor(Math.random() * (100 - 1) + 1));
    } else {
      this.props.newScore(this.props.score - 1);
      this.props.setProblem(Math.floor(Math.random() * (100 - 1) + 1), Math.floor(Math.random() * (100 - 1) + 1));
    }
  }


  render() {

    const style = {
      color: 'white',
      height: 'none !important',
      flex: 1,
      margin: 10,
    }
    return(
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100vw',
        }}
      >
        <ScoreBoard />
        <div
          style={{
            display: 'flex',
            flex: 3,
            flexDirection: 'column',
            justifyContent: 'center',
            margin: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
            }}
          >
            <FlatButton
              label={this.props.correctBox === 1 ? `${this.props.answer}` : `${this.props.box1}`}
              backgroundColor={red500}
              style={style}
              labelStyle={{fontSize: 35}}
              onClick={() => this.checkAnswer(1)}
              disabled={this.props.timer === 0}
            />
            <FlatButton
              label={this.props.correctBox === 2 ? `${this.props.answer}` : `${this.props.box2}`}
              backgroundColor={red500}
              style={style}
              labelStyle={{fontSize: 35}}
              onClick={() => this.checkAnswer(2)}
              disabled={this.props.timer === 0}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
            }}
          >
            <FlatButton
              label={this.props.correctBox === 3 ? `${this.props.answer}` : `${this.props.box3}`}
              backgroundColor={red500}
              style={style}
              labelStyle={{fontSize: 35}}
              onClick={() => this.checkAnswer(3)}
              disabled={this.props.timer === 0}
            />
            <FlatButton
              label={this.props.correctBox === 4 ? `${this.props.answer}` : `${this.props.box4}`}
              backgroundColor={red500}
              style={style}
              labelStyle={{fontSize: 35}}
              onClick={() => this.checkAnswer(4)}
              disabled={this.props.timer === 0}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    answer: state.app.answer,
    score: state.app.score,
    correctBox: state.app.correctBox,
    box1: state.app.box1,
    box2: state.app.box2,
    box3: state.app.box3,
    box4: state.app.box4,
    timer: state.app.timer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newScore: (answer) => {
      dispatch(setScore(answer))
    },
    setProblem: (numA, numB) => {
      dispatch(setNum(numA, numB))
    },
  }
}

const ConnectedGameBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameBoard)

export default ConnectedGameBoard;
