import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { setScene, setUser } from './Actions';
import Game from './Containers/Game';
import GameOver from './Containers/GameOver/GameOver';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionFlightTakeoff from 'material-ui/svg-icons/action/lightbulb-outline';
import {red500} from 'material-ui/styles/colors';
import Login from './Login';
import logo from './logo.svg';
import google from './google.png';
import './App.css';

var firebase = require("firebase");

var config = {
  apiKey: "AIzaSyAp6ou6kh4UNSA16Syu-yW80kIBGb7Dp04",
  authDomain: "brain-trainer-763ee.firebaseapp.com",
  databaseURL: "https://brain-trainer-763ee.firebaseio.com",
};
firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: true,
      displayName: "",
      avatar: "",
    }
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.isAuthorized = this.isAuthorized.bind(this);
  }
  componentWillMount() {
    this.isAuthorized();
  }
  signIn() {
    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // console.log user info
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  signOut() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      this.setState({authorized: false});
    }).catch(function(error) {
      // An error happened.
    });
  }

  startNewGame() {
    this.props.newGame("GAME");
  }

  isAuthorized() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log(user);
        this.setState({
          authorized: true,
          displayName: user.displayName.split(" ")[0],
          avatar: user.photoURL,
        });
        this.props.getUser(user.displayName, user.uid)
      } else {
        // No user is signed in.
        this.setState({authorized: false});
      }
    });
  }

  renderGame() {
    if(this.props.scene === "GAME") {
      return (
        <Game key={"Game"}/>
      );
    }
    if(this.props.scene === "GAMEOVER") {
      return (
        <GameOver key={"GameOver"} />
      );
    }
    return (
      <div
        key={"Home"}
        className="Home"
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}>
        <div
          style={{
            flex: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActionFlightTakeoff className={this.state.authorized ? "App-logo" : ""} style={{height: '300px', width: '300px'}} color={red500}/>
          <h1 className="App-title" style={{color: red500}}>BRAIN TRAINER</h1>
        </div>
        {this.state.authorized ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <FlatButton
              label="Start"
              labelPosition="before"
              backgroundColor={red500}
              labelStyle={{color: 'white'}}
              hoverColor={'black'}
              onClick={this.startNewGame}
            />
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <FlatButton
              icon={<img onClick={this.signIn} src={google} style={{height: '-webkit-fill-available'}}/>}
              hoverColor={'none'}
            />
          </div>
        )}
      </div>
    );
  }
  render() {
    return (
      <div className="App"
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}>
        {this.state.authorized &&
            <IconButton
              style={{
                width: 60,
                height: 60,
                position: 'absolute'
              }}
              onClick={this.signOut}
            >
              <Avatar
                src={this.state.avatar}
                size={30}
              />
            </IconButton>
        }
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {this.renderGame()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    scene: state.app.scene
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newGame: (scene) => {
      dispatch(setScene(scene))
    },
    getUser: (userName, userId) => {
      dispatch(setUser(userName, userId))
    }
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp;
