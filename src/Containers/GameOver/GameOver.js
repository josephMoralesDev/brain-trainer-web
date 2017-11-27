import React, {Component} from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/alarm';
import {red500} from 'material-ui/styles/colors';
import PlayerScore from './PlayerScore';

class GameOver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countDown: 2,
    }
  }

  componentWillMount() {
    console.log({
      variables: {
        id: this.props.userId,
        newName: this.props.userName,
        newScore: this.props.newScore
      }
    });
    console.log(this.props);
    this.props.mutate()
      .then(({ data }) => {
        console.log('got data', data);
      })
      .catch((error) => {
        console.log('there was an error sending the query', error);
      });

    var countDownTimer = setInterval(() => {
      this.setState({countDown: this.state.countDown - 1})
    }, 1000);

    setTimeout(function(){ clearInterval(countDownTimer) }, 2000);
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
            <PlayerScore />
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


const createScore = gql`
  mutation {
    createScore(id: "32", newName: "fd", newScore: 3)
  }
`;

const NewEntryWithData = graphql(createScore)(ConnectedGameOver);

export default NewEntryWithData;
