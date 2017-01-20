import React, { Component } from 'react'
import { NavbBar } from './'
import { } from 'react-bootstrap';
import { connect } from 'react-redux'
import { } from '../utils/consts'

class AvaliacoesClass extends Component {
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

export let Avaliacoes = connect(
  state => ({ 
    token: state.loginReducer.token,
  }),
  null
)(AvaliacoesClass)
 