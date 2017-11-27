import React, {Component} from 'react';
import { connect } from 'react-redux';
import { setScene, setTimer, setScore } from '../../Actions';
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
  }
  startNewGame() {
    this.props.setTime(30);
    this.props.newScore(0);
    this.props.newGame("GAME");
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
          }}>
          <h1 style={{fontSize: '1.3rem'}}> New High Score! </h1>
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
          <div  style={{ flex: 1 }}>
            <FlatButton
              label="Retry"
              labelPosition="before"
              backgroundColor={red500}
              labelStyle={{color: 'white'}}
              hoverColor={'black'}
              icon={<Renew color={'white'}/>}
              onClick={this.startNewGame}
            />
          </div>
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <h1 style={{flex: 1, fontSize: '1.2rem'}}>score: {this.props.score}</h1>
          <h1 style={{flex: 1, fontSize: '1.2rem'}}>rank: 5</h1>
          <div  style={{ flex: 1 }}><IconButton style={{backgroundColor:red500}}> <List color={'white'} /> </IconButton></div>
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
  }
}

const ConnectedPlayerScore = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerScore)

export default ConnectedPlayerScore;
