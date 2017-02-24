import React, { Component } from 'react'
import { NavbBar } from './'
import { } from 'react-bootstrap';
import { connect } from 'react-redux'
import { NotaService } from '../services'
import { Grid, Row, Col, Table, FormGroup, FormControl} from 'react-bootstrap'
import { } from 'react-router-bootstrap'
import { } from 'react-router'
import { Treebeard, decorators } from 'react-treebeard'
import { get } from 'lodash'
import treeBeardStyle from './TreeBeard.css.js'

const style = {
  FortyfivePercent : {
    width: '45%'
  },
  TirtyfivePercent : {
    width: '35%'
  },
  TwentyPercent : {
    width: '20%'
  },
  green : {
    color: '#00802b'
  },
  red : {
    color: '#ff1a1a'
  },
  yellow : {
    color: '#e6ac00'
  }
}

decorators.Header = (props) => {
    let done = false
    let partialStyle = {
      fontWeight: 'bold'
    }
    if (props.node.itens) {
      partialStyle = style.red
      done = props.node.itens.reduce((result, nota) => {
        if (!result) {
          return result
        }
        if (!!nota.pontuacao) {
          partialStyle = style.yellow
          return true
        }
        return false
      }, true)
      partialStyle = done ? style.green : partialStyle
    }
    return (
        <span style={props.style}>
            <span style={partialStyle}>
              {props.node.name}
            </span>
        </span>
    );
}


function mountTree (result, element) {
  if (!Object.keys(result).length) {
    result.name = 'Items'
    result.type = 'root'
    result.children = []
    result.toggled = true
  }
  let tipo = get(element, ['item', 'subnivel', 'nivel', 'tipo', 'nome'])
  let nivel = get(element, ['item', 'subnivel', 'nivel', 'nome'])
  let subnivel = get(element, ['item', 'subnivel', 'nome'])
  let root = result.children
  let newRoot = root.filter((rootElement) => rootElement.name === tipo)
  if (!newRoot.length) {
    root.push({
      name: tipo,
      type: 'tipo',
      toggled: true,
      children: []
    })
    newRoot = root[root.length - 1].children
  } else {
    newRoot = newRoot.pop().children
  }
  root = newRoot
  newRoot = root.filter((rootElement) => rootElement.name === nivel)
  if (!newRoot.length) {
    root.push({
      name: nivel,
      type: 'nivel',
      toggled: true,
      children: []
    })
    newRoot = root[root.length - 1].children
  } else {
    newRoot = newRoot.pop().children
  }
  root = newRoot
  newRoot = root.filter((rootElement) => rootElement.name === subnivel)
  if (!newRoot.length) {
    root.push({
      name: subnivel,
      type: 'subnivel',
      itens: []
    })
    newRoot = root[root.length - 1]
  } else {
    newRoot = newRoot.pop()
  }
  newRoot.itens.push(element)
  return result
}

class ObjetoAvaliacaoClass extends Component {
  constructor () {
    super()
    this.state = {
      notas: [],
      loading: false,
      data: {},
      displayableItens: []
    }
  }

  componentDidMount = () => {
    NotaService.getPopulated(this.props.token, this.props.params.objetoAvaliacaoId)
      .then((res) => {
        if (res.length) {
          this.setState({notas: res})
          /*eslint-disable */
          this.state.data = res.reduce(mountTree, {})
          /*eslint-enable */
          this.forceUpdate()
        }
      })
      .catch((err) => console.log(err))
  }

  onToggle = (node, toggled) => {
    if (this.state.cursor) {
      this.setState({cursor : Object.assign(this.state.cursor, {active: false})})
    }
    node.active = true;
    if (node.children) { 
      node.toggled = toggled; 
    }
    this.setState({ cursor: node });
    if (node.type === 'subnivel') {
      this.setState({ displayableItens: node.itens })
    }
  }

  selectPontuacao = (e) => {
    let notas = this.state.notas.map((nota) => {
      if (nota.item._id.toString() === e.target.getAttribute("data-key")) {
        if (nota.pontuacao !== e.target.value) {
          nota.pontuacao = e.target.value
          NotaService.setNota(this.props.token, nota._id, Object.assign({}, nota, { 
            item: nota.item._id.toString(),
            objetoAvaliacao: nota.objetoAvaliacao._id.toString()
          }))
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        }
      }
      return nota
    })
    return this.setState({ notas: notas })
  }

  getNomeAvaliacao = () => {
    if ( this.state.notas.length ) {
      return (
        <h3>Objeto Avaliação > {this.state.notas[0].objetoAvaliacao.entidade.nome}</h3>
      )
    } else {
      return (
        <h3>Objeto Avaliação > Carregando</h3>
      )
    }
  }

  render() {
    return (
      <div className="Login">
        <NavbBar/>
        <div className="content">
          <header>
             { this.getNomeAvaliacao() }
          </header>
          <section>
            <Row>
              <Grid fluid>
                <Col md={3}>
                  <Treebeard
                      data={this.state.data}
                      onToggle={this.onToggle}
                      style={treeBeardStyle}
                      decorators={decorators}
                  />
                </Col>
                <Col md={9}>
                  <Table>
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Exigência</th>
                        <th>Pontuacoes</th>
                      </tr>
                    </thead>
                    <tbody>
                      { this.state.displayableItens.map((nota) => {
                        let item = nota.item
                        return (
                          <tr key={item._id}>
                            <td style={style.TwentyPercent}>{item.nome}</td>
                            <td style={style.FortyfivePercent}>{item.exigencia}</td>
                            <td style={style.TirtyfivePercent}>
                              <form>
                                <FormGroup controlId="formControlsSelect">
                                  <FormControl 
                                    componentClass="select" 
                                    placeholder="select" 
                                    onBlur={this.selectPontuacao} 
                                    onChange={this.selectPontuacao} 
                                    data-key={item._id} 
                                    value={nota.pontuacao}>
                                    { 
                                      item.pontuacoes.map(pontuacao => {
                                        return (
                                          <option key={pontuacao._id} value={pontuacao._id}>{pontuacao.nota} - {pontuacao.descricao}</option>
                                        )
                                      })
                                    }
                                  </FormControl>
                                </FormGroup>
                              </form>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Grid>
            </Row>
          </section>
        </div>
      </div>
    );
  }
}

export let ObjetoAvaliacao = connect(
  state => ({ 
    token: state.loginReducer.token,
  }),
  null
)(ObjetoAvaliacaoClass)
 