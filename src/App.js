import React, { Component } from 'react';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import { Login, PostList, Dashboard, FourOFourClass, Avaliacoes, CriarAvaliacao, Indicadores } from './components'

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
            <Route path="/" component={Dashboard} onEnter={redirectLogin}/>
            <Route path="login" component={Login} onEnter={redirectDefault} />
            <Route path="post-list" component={PostList} onEnter={redirectLogin}/>
            <Route path="avaliacoes" component={Avaliacoes} onEnter={redirectLogin}/>
            <Route path="criar-avaliacao" component={CriarAvaliacao} onEnter={redirectLogin}/>
            <Route path="indicadores" component={Indicadores} onEnter={redirectLogin}/>
            <Route path="/*" component={FourOFourClass}/>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;