import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory, IndexRoute  } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { Login, PostList, Counter, FourOFourClass, NavbBar } from './components'

import './App.css'

import * as reducers from './reducers'

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

function redirectLogin (nextState, replace) {
  var token = store.getState().loginReducer.token
  if (!token.length) {
    replace({
      pathname: '/login'
    })
  }
}

function redirectDefault (nextState, replace) {
  var token = store.getState().loginReducer.token
  console.log(store.getState())
  if (token.length) {
    replace({
      pathname: '/'
    })
  }
}

const history = syncHistoryWithStore(browserHistory, store)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router history={history}>
            <Route path="/" component={Counter} onEnter={redirectLogin}/>
            <Route path="login" component={Login} onEnter={redirectDefault} />
            <Route path="post-list" component={PostList} onEnter={redirectLogin}/>
            <Route path="/*" component={FourOFourClass}/>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;