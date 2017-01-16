import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { Login, PostList, Counter } from './components'

import './App.css'

import * as reducers from './reducers'

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

const history = syncHistoryWithStore(browserHistory, store)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router history={history}>
            <Route path="/" component={Login} />
            <Route path="/foo" component={PostList}/>
            <Route path="/bar" component={Counter}/>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
