import React, { Component } from 'react'
import './Login.css'
import { Button, PageHeader, FormGroup, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';
import { UserService } from '../services/User'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { LOGIN } from '../utils/consts'

function setLogin (token) {
  return {
    type: LOGIN,
    value: token
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
  constructor() {
    super()
    console.log(sessionStorage.getItem('Authorization'))
    this.state = {
      token: '',
      registering: false,
      username: '',
      fullname: '',
      email: '',
      password: '',
      password2: ''
    }
  }

  

  login () {
    console.log('Iniciei')
    UserService.login(this.state)
    .then(res => {
      this.setState({token: res.token})
      sessionStorage.setItem('Authorization', this.state.token)
      console.log(this.state.token)
      this.props.setLogin(res.token)
    })
    
    .catch(err => {
      console.warn('Invalid login provided.', err)  
    })
  }

  toggleSignup () {
    this.clearState()
    this.setState({ registering: !this.state.registering })
  }

  clearState () {
    this.setState({
      username: '',
      fullname: '',
      email: '',
      password: '',
      password2: ''
    })
  }

  signup () {
    UserService.signup(this.state)
    .then((res) => {
      console.log(res)
      this.setState({token: res.token})
      sessionStorage.setItem('Authorization', this.state.token)
      this.clearState()
      this.toggleSignup()
    })
    .catch(err => {
      if (err.code === 11000) {
        console.log('This user already exists')
      }
      console.log(err)  
    })
  }

  setUsername(newValue) {
    this.setState({ username: newValue.target.value });
  }

  setPassword(newValue) {
    this.setState({ password: newValue.target.value });
  }

  setPassword2(newValue) {
    this.setState({ password2: newValue.target.value });
  }

  setFullname(newValue) {
    this.setState({ fullname: newValue.target.value });
  } 

  setEmail(newValue) {
    this.setState({ email: newValue.target.value });
  }
 
  render() {
    let { token, setLogin } = this.props
    return (
      <div className="Login">
        { token }
        <PageHeader>Login</PageHeader>
        <form>
          <FieldGroup
            id="formControlsText"
            type="text"
            label="Nome de Usuário"
            placeholder=""
            value={this.state.username}
            onChange={this.setUsername.bind(this)}
          />
          <FieldGroup
            id="formControlsPassword"
            label="Senha"
            type="password"
            value={this.state.password}
            onChange={this.setPassword.bind(this)}
          />
          { this.state.registering ? 
            (
              <div>
                <FieldGroup
                  id="formControlsPassword2"
                  label="Repita sua Senha"
                  type="password"
                  value={this.state.password2}
                  onChange={this.setPassword2.bind(this)}
                />
                <FieldGroup
                  id="formControlsText2"
                  type="text"
                  label="Nome Completo"
                  placeholder=""
                  value={this.state.fullname}
                  onChange={this.setFullname.bind(this)}
                />
                <FieldGroup
                  id="formControlsEmail"
                  type="email"
                  label="Email"
                  placeholder=""
                  value={this.state.email}
                  onChange={this.setEmail.bind(this)}
                />
              </div>
            )
            : null 
          }
          { !this.state.registering ? 
            (
              <div>
                <Button bsStyle="primary" onClick={this.login.bind(this)} block>Login</Button>
                <Button bsStyle="default" onClick={this.toggleSignup.bind(this)} block>Cadastrar</Button>
              </div>
            ) :
            <div>
              <Button bsStyle="primary" onClick={this.signup.bind(this)} block>Registrar</Button>
              <Button bsStyle="default" onClick={this.toggleSignup.bind(this)} block>Cancelar</Button>
            </div>
          }
        </form>
        <Link to="/bar">Counter</Link>
      </div>
    );
  }
}


export let Login = connect(
  state => ({ token: state.loginReducer.token }),
  { setLogin }
)(LoginClass)
 
        