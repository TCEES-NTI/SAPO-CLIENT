import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { LOGIN } from '../utils/consts'
import { browserHistory } from 'react-router'

function setLogout () {
  return {
    type: LOGIN,
    value: ''
  }
}

class NavbBarClass extends Component {
  logout = () => {
    this.props.dispatch(setLogout())
    browserHistory.replace("/login")
  }

  render() {
    return (
      <div className="NavBar">
         <Navbar collapseOnSelect staticTop fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">SAPO</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/">
                <NavItem eventKey={1}>Início</NavItem>
              </LinkContainer>
              <LinkContainer to="/avaliacoes">
                <NavItem eventKey={2}>Avaliacoes</NavItem>
              </LinkContainer>
              <LinkContainer to="/criar-avaliacao">
                <NavItem eventKey={3}>Criar Avaliação</NavItem>
              </LinkContainer>
              <LinkContainer to="/gerenciaveis">
                <NavItem eventKey={4}>Painel Gerencial</NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              {
                !this.props.token.length ? 
                (
                  <LinkContainer to="/login">
                    <NavItem eventKey={3}>Login</NavItem>
                  </LinkContainer>
                ) : (
                  <NavItem eventKey={3} onClick={this.logout}>Logout</NavItem>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export let NavbBar = connect(
  state => ({ 
    token: state.loginReducer.token,
  }),
  null
)(NavbBarClass)
 





