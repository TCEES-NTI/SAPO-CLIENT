import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { INCREASE, DECREASE } from '../utils/consts'
import { NavbBar } from './'

function increase(n) {
  return {
    type: INCREASE,
    amount: n
  }
}

function decrease(n) {
  return {
    type: DECREASE,
    amount: n
  }
}

class CounterClass extends Component {
  render () {
    let { number, increase, decrease } = this.props
    return (
      <div>
        <NavbBar/>
        <div className="CounterContent">
          <Link to="/login">Login</Link>
          <Link to="/post-list">Post List</Link>
          Some state changes:
          { number }
          <button onClick={() => increase(1)}>Increase</button>
          <button onClick={() => decrease(1)}>Decrease</button>
          <br/>
          <Link className="btn button btn-default" to="/">Home</Link>
        </div>
      </div>
    )
  }
}

export let Counter = connect(
  state => ({ number: state.countReducer.number }),
  { increase, decrease }
)(CounterClass)