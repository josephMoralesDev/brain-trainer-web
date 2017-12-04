import React, {Component} from 'react';
import { connect } from 'react-redux';
import { setDialog } from '../../Actions';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/alarm';
import {red500} from 'material-ui/styles/colors';
import PlayerScore from './PlayerScore';
import {db} from '../../App.js'
import LeaderBoard from '../LeaderBoard';

class GameOver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countDown: 2,
      playersBest: false,
    }
  }

  componentWillMount() {
    db.collection("high_scores").doc(this.props.userId).get().then((doc) => {
        if (doc.exists) {
            console.log(doc.data());
            this.setState({ playersBest: this.props.newScore > doc.data().score });
            if (this.props.newScore > doc.data().score) {
              db
              .collection("high_scores")
              .doc(this.props.userId)
              .set({
                name: this.props.userName,
                score: this.props.newScore
              })
              .then(() => {
                console.log("Nice");
              });
            }
        } else {
          db
          .collection("high_scores")
          .doc(this.props.userId)
          .set({
            name: this.props.userName,
            score: this.props.newScore
          })
          .then(() => {
            console.log("Nice");
          });
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });



    var countDownTimer = setInterval(() => {
      this.setState({countDown: this.state.countDown - 1})
    }, 1000);

    setTimeout(function(){ clearInterval(countDownTimer) }, 3000);
  }

  render() {
    return (
      <div className="GameOver"
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LeaderBoard />
        <ReactCSSTransitionGroup
          transitionName="Game-Over"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>

          {this.state.countDown > 0 ? (
            <div
              key={"GAME_OVER"}
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
              }}
            >
              <ActionFlightTakeoff className="GameOver-logo" style={{height: '250px', width: '250px'}} color={red500}/>
            </div>
          ) : (
            <PlayerScore playersBest={this.state.playersBest}/>
          )}
      </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.app.userName,
    userId: state.app.userId,
    newScore: state.app.score,
  }
};

const ConnectedGameOver = connect(mapStateToProps)(GameOver);


export default ConnectedGameOver;
