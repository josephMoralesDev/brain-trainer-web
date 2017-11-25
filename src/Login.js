import React, {Component} from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          Sign In With Button Below
        </p>
        <button onClick={this.signIn}> Click to Sign In </button>
      </div>
    );
  }
}

export default Login;
