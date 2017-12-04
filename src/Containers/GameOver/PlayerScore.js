import React, {Component} from 'react';
import { connect } from 'react-redux';
import { setScene, setTimer, setScore, setDialog } from '../../Actions';
import List from 'material-ui/svg-icons/action/list';
import Renew from 'material-ui/svg-icons/action/autorenew';
import IconButton from 'material-ui/IconButton';
import ActionFlightTakeoff from 'material-ui/svg-icons/social/sentiment-very-satisfied';
import FlatButton from 'material-ui/FlatButton';
import {red500} from 'material-ui/styles/colors';

class PlayerScore extends Component {
  constructor(props) {
    super(props);
    this.startNewGame = this.startNewGame.bind(this);
    this.handleDialog = this.handleDialog.bind(this);
  }
  startNewGame() {
    this.props.setTime(30);
    this.props.newScore(0);
    this.props.newGame("GAME");
  }

  handleDialog() {
    this.props.openDialog();
  }

  render() {
    return (
      <div
        key={"YOUR_SCORE"}
        style={{
          top: 0,
          left: 0,
          position: 'absolute',
          color: red500,
          display: 'flex',
          height: '100vh',
          width: '100vw',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <div
          style={{
            flex: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            MozPerspective: 1000,
            WebkitPerspective: 1000,
          }}>
          <h1 style={{fontSize: '1.3rem'}}> {this.props.playersBest ? "New High Score!" : "Game Over"} </h1>
          <ActionFlightTakeoff className="App-logo" style={{height: '300px', width: '300px'}} color={red500}/>
        </div>
        <div
          style={{
            flex: .5,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <h1 style={{flex: 1, fontSize: '1.2rem'}}>Your score: {this.props.score}</h1>
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            margin: '20px',
          }}
        >
          <div
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              margin: '20px',
            }}
          >
            <IconButton
              onClick={this.startNewGame}
              style={{
                backgroundColor:red500,
                flex: 1,
                height: 'auto',
                width: 'auto',
              }}
            > <Renew size={20}color={'white'}/> </IconButton>
          </div>
          <div
            style={{
              flex: 1,
              height: '100%',
              display: 'flex',
              margin: '20px',
            }}
          >
            <IconButton
            onClick={this.handleDialog}
            style={{
              backgroundColor:red500,
              flex: 1,
              height: 'auto',
              width: 'auto',
            }}> <List size={20} color={'white'} /> </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    score: state.app.score,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newGame: (scene) => {
      dispatch(setScene(scene))
    },
    setTime: (time) => {
      dispatch(setTimer(time))
    },
    newScore: (answer) => {
      dispatch(setScore(answer))
    },
    openDialog: () => {
      dispatch(setDialog())
    },
  }
}

const ConnectedPlayerScore = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerScore)

export default ConnectedPlayerScore;
