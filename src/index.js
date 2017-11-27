import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import './index.css';
import App from './App';
import brainTrainerApp from './Reducers';
import registerServiceWorker from './registerServiceWorker';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
let store = createStore(brainTrainerApp)

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://us-central1-brain-trainer-763ee.cloudfunctions.net/api/graphiql' }),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <MuiThemeProvider>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
