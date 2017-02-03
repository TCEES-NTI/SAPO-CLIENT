import React, { Component } from 'react'
import { } from 'react-bootstrap';
import { } from 'react-redux'
import { } from '../utils/consts'
import { Breadcrumb } from 'react-bootstrap'
import { browserHistory } from 'react-router'

function definePath (navigationObject, recurssiveResult = []) {
  const path = Object.keys(navigationObject).pop()
  const actual = navigationObject[path]
  if (actual) {
    recurssiveResult.push({
      name: actual.name,
      path: recurssiveResult.map(e => e.path).join('/') + '/' + path,
      redirect: () => {
        browserHistory.replace(recurssiveResult.map(e => e.path).join('/') + '/' + path)
      }
    })
    if (actual.child) {
      return definePath(actual[Object.keys(actual).pop()], recurssiveResult)
    } else {
      return recurssiveResult.map((result, key) => {
        return (
          <Breadcrumb.Item onClick={ result.redirect } key={key}>
            { result.name }
          </Breadcrumb.Item>
        )
      })
    }
  }
}

export class BreadcrumbComponent extends Component {
  constructor () {
    super()
    this.state = {
      avaliacoes: [],
      loading: false
    }
  }

  render() {
    return (
      <nav>
        <Breadcrumb>
          <Breadcrumb.Item active>
            Avaliacoes
          </Breadcrumb.Item>
           {definePath(this.props.navigationObject)}
        </Breadcrumb>
      </nav>
    );
  }
}

 