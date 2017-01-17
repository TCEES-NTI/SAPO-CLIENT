import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import { Link } from 'react-router'
import { connect } from 'react-redux'


class NavbBarClass extends Component {
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
              <NavItem>
                <Link to="/">Início</Link>
              </NavItem>
              <NavItem>
                <Link to="/post-list">Post List</Link>
              </NavItem>
            </Nav>
            <Nav pullRight>
              {
                !this.props.token.length ? 
                (
                  <NavItem>
                    <Link to="/login">Login</Link>
                  </NavItem>
                ) : (
                  <NavItem>
                    <Link to="/logout">Logout</Link>
                  </NavItem>
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
 





