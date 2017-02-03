import React, { Component } from 'react'
import './Login.css'
import { Button, PageHeader, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import { UserService } from '../services'
import { connect } from 'react-redux'
import { LOGIN, SET_LOGIN_ATTRIBUTE } from '../utils/consts'
import { browserHistory } from 'react-router'
import { NavbBar } from './'

function setLogin (token) {
  return {
    type: LOGIN,
    value: token
  }
}

function setAttribute (attributeName, value) {
  return {
    type: SET_LOGIN_ATTRIBUTE,
    attributeName: attributeName,
    value: value
  }
}

function FieldGroup({id, label, help, ...props}) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}


class LoginClass extends Component {
  
  setUsername = newValue => this.props.dispatch(setAttribute('username', newValue.target.value))
  setPassword = newValue => this.props.dispatch(setAttribute('password', newValue.target.value))
  setPassword2 = newValue => this.props.dispatch(setAttribute('password2', newValue.target.value))
  setFullname = newValue => this.props.dispatch(setAttribute('fullname', newValue.target.value))
  setEmail = newValue => this.props.dispatch(setAttribute('email', newValue.target.value))

  toggleSignup = () => {
    this.clearState()
    this.props.dispatch(setAttribute('registering', !this.props.registering))
  }

  clearState = () => {
    this.props.dispatch(setAttribute('username', ''))
    this.props.dispatch(setAttribute('fullname', ''))
    this.props.dispatch(setAttribute('email', ''))
    this.props.dispatch(setAttribute('password', ''))
    this.props.dispatch(setAttribute('password2', ''))
  }

  login = () => {
    UserService.login({ username: this.props.username, password: this.props.password })
    .then(res => {
      this.props.dispatch(setLogin(res.token))
      browserHistory.replace("/")
    })
    .catch(err => {
      alert('Invalid login provided.')  
    })
  }

  signup = () => {
    if (this.props.password !== this.props.password2) {
      throw new Error("Passwords must match.")
    }
    UserService.signup({
      username: this.props.username,
      name: this.props.fullname,
      email: this.props.email,
      password: this.props.password
    })
    .then((res) => {
      this.props.dispatch(setAttribute('token', res.token))
      this.clearState()
      this.toggleSignup()
    })
    .catch(err => {
      if (err.code === 11000) {
        console.log('This user already exists')
      }
    })
  }
 
  render() {
    let { 
      registering, 
      username, 
      fullname,
      email, 
      password, 
      password2
    } = this.props
    return (
      <div className="Login">
        <NavbBar/>
        <div className="LoginContent">
          <PageHeader>Login</PageHeader>
          <form>
            <FieldGroup
              id="formControlsText"
              type="text"
              label="Nome de Usuário"
              placeholder=""
              value={username}
              onChange={this.setUsername}
            />
            <FieldGroup
              id="formControlsPassword"
              label="Senha"
              type="password"
              value={password}
              onChange={this.setPassword}
            />
            { registering ? 
              (
                <div>
                  <FieldGroup
                    id="formControlsPassword2"
                    label="Repita sua Senha"
                    type="password"
                    value={password2}
                    onChange={this.setPassword2}
                  />
                  <FieldGroup
                    id="formControlsText2"
                    type="text"
                    label="Nome Completo"
                    placeholder=""
                    value={fullname}
                    onChange={this.setFullname}
                  />
                  <FieldGroup
                    id="formControlsEmail"
                    type="email"
                    label="Email"
                    placeholder=""
                    value={email}
                    onChange={this.setEmail}
                  />
                </div>
              )
              : null 
            }
            { !registering ? 
              (
                <div>
                  <Button bsStyle="primary" onClick={this.login} block>Login</Button>
                  <Button bsStyle="default" onClick={this.toggleSignup} block>Cadastrar</Button>
                </div>
              ) :
              <div>
                <Button bsStyle="primary" onClick={this.signup} block>Registrar</Button>
                <Button bsStyle="default" onClick={this.toggleSignup} block>Cancelar</Button>
              </div>
            }
          </form>
        </div>
      </div>
    );
  }
}


export let Login = connect(
  state => ({ 
    token: state.loginReducer.token,
    registering: state.loginReducer.registering,
    username: state.loginReducer.username,
    fullname: state.loginReducer.fullname,
    email: state.loginReducer.email,
    password: state.loginReducer.password,
    password2: state.loginReducer.password2
  }),
  null
)(LoginClass)
 