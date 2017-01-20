import React, { Component } from 'react'
import { NavbBar } from './'
import { } from 'react-bootstrap';
import { connect } from 'react-redux'
import { } from '../utils/consts'

class IndicadoresClass extends Component {
  render() {
    return (
      <div className="Login">
        <NavbBar/>
        <div className="content">
        </div>
      </div>
    );
  }
}

export let Indicadores = connect(
  state => ({ 
    token: state.loginReducer.token,
  }),
  null
)(IndicadoresClass)
 