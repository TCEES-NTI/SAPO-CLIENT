import React, { Component } from 'react'
import { NavbBar } from './'
import { } from 'react-bootstrap';
import { connect } from 'react-redux'
import * as Services from '../services'
import { Grid, Row, Col, Table, FormGroup, FormControl, ButtonToolbar, Button, ControlLabel} from 'react-bootstrap'
import { } from 'react-router-bootstrap'
import { } from 'react-router'
import { Treebeard } from 'react-treebeard'
import treeBeardStyle from './TreeBeard.css.js'
import { saveData } from '../utils/DataExport'


const style = {
  ThirtyPercent : {
    width: '30%'
  },
  FiftyPercent : {
    width: '50%'
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

const modelTemplates = {
  Item: {
    nome: '',
    exigencia: '',
    notaMaxima: '',
    subnivel: ''
  },
  Pontuacao: {
    item: '',
    descricao: '',
    nota: ''
  }
}

class GerenciaveisClass extends Component {
  constructor () {
    super()
    this.state = {
      model: '',
      data: {
        name: 'Gerenciaveis',
        type: 'root',
        toggled: true,
        children: [
          {
            name: 'Indicadores',
            type: 'Indicador',
            children: [
              {
                name: 'Pilares',
                type: 'Pilar',
                children: [
                  {
                    name: 'Tipos',
                    type: 'Tipo',
                    children: [
                      {
                        name: 'Niveis',
                        type: 'Nivel',
                        children: [
                          {
                            name: 'Subniveis',
                            type: 'Subnivel',
                            children: [
                              {
                                name: 'Itens',
                                type: 'Item',
                                children: [
                                  {
                                    name: 'Pontuações',
                                    type: 'Pontuacao'
                                    
                                  },
                                  {
                                    name: 'Normas',
                                    type: 'Norma',
                                    children: [
                                      {
                                        name: 'Criterios Legais',
                                        type: 'CriterioLegal'
                                      }
                                    ]
                                  }                                  
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            name: 'Entidades',
            type: 'Entidade'
          },
          {
            name: 'Usuários',
            type: 'User'
          }
        ]
      },
      displayableItens: [],
      newIndicador: {},
      newPilar: {},
      newTipo: {},
      newNivel: {},
      newSubnivel: {},
      newItem: {},
      newPontuacao: {}
    }
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
    this.setState({ model: node.type })
    if (node.type !== 'root') {
      try {
        Services[`${node.type}Service`].getAllWithParents(this.props.token)
        .then(res => {
          console.log(res)
          this.setState({ displayableItens: res })
          this.state[node.type] = res
        })
        .catch(err => console.log(err))
      } catch (e) {
        Services[`${node.type}Service`].getAll(this.props.token)
          .then(res => {
            console.log(res)
            this.setState({ displayableItens: res })
          })
          .catch(err => console.log(err))
      }
    }
  }

  selectSubnivel = (e) => {
    this.setState({ newItem: Object.assign(this.state.newItem, {subnivel: e.target.value })})
  }

  selectItem = (e) => {
    this.setState({ newPontuacao: Object.assign(this.state.newPontuacao, {item: e.target.value })})
  }

  // ITEM
  setItemNome = (e) => this.setState({ newItem: Object.assign(this.state.newItem, {nome: e.target.value }) })
  setItemExigencia = (e) => this.setState({ newItem: Object.assign(this.state.newItem, {exigencia: e.target.value }) })
  setItemNota = (e) => this.setState({ newItem: Object.assign(this.state.newItem, {notaMaxima: e.target.value }) })

  // PONTUACAO
  setPontuacaoNome = (e) => this.setState({ newPontuacao: Object.assign(this.state.newPontuacao, {nome: e.target.value }) })
  setPontuacaoDescricao = (e) => this.setState({ newPontuacao: Object.assign(this.state.newPontuacao, {descricao: e.target.value }) })
  setPontuacaoNota = (e) => this.setState({ newPontuacao: Object.assign(this.state.newPontuacao, {nota: e.target.value }) })

  create = (modelName) => {
    Services[`${modelName}Service`].create(this.props.token, this.state[`new${modelName}`])
      .then(response => {
        console.log(response)
        this.state[`new${modelName}`] = modelTemplates[modelName]
        this.forceUpdate()
        window.scrollTo(0, 0)
      })
      .catch(err => {
        alert(err)
      })
  }

  update = (modelName, item) => {
    let updatableObj = Object.assign({}, modelTemplates[modelName], { _id: item._id.toString() })
    Object.keys(updatableObj).forEach((key) => {
      if (item[key]._id) {
        item[key] = item[key]._id.toString()
      }
      updatableObj[key] = item[key]
    })
    this.state[`new${modelName}`] = updatableObj
    this.forceUpdate()
    window.scrollTo(0, 0)
  }

  renderForm(model) {
    switch(model) {
      case 'Indicador':
        return (
          <div>
            <h1>Indicador</h1>
          </div>
        )
      case 'Pilar':
        return (
          <div>
            <h1>Pilar</h1>
          </div>
        )
      case 'Tipo':
        return (
          <div>
            <h1>Tipo</h1>
          </div>
        )
      case 'Nivel':
        return (
          <div>
            <h1>Nível</h1>
          </div>
        )
      case 'Subnivel':
        return (
          <div>
            <h1>Subnível</h1>
          </div>
        )
      case 'Item':
        return (
          <div>
            <h1>Item</h1>
            <form>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Subnivel</ControlLabel>
                <FormControl componentClass="select" placeholder="select" onChange={this.selectSubnivel}>
                  { 
                    this.state.Subnivel.map(subnivel => (<option key={subnivel._id} value={subnivel._id}>{subnivel.nome}</option>))
                  }
                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Nome</ControlLabel>
                <FormControl
                      id="formControlsPassword2"
                      type="text"
                      value={this.state.newItem.nome}
                      onChange={this.setItemNome}
                    />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Exigencia</ControlLabel>
                <FormControl
                      id="formControlsPassword2"
                      type="text"
                      value={this.state.newItem.exigencia}
                      onChange={this.setItemExigencia}
                    />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Nota Máxima</ControlLabel>
                <FormControl
                      id="formControlsPassword2"
                      type="number"
                      value={this.state.newItem.notaMaxima}
                      onChange={this.setItemNota}
                    />
              </FormGroup>
            </form>
            <Button 
              bsStyle="success" 
              onClick={(e) => this.create(model)} 
              bsSize="sm" 
              block
              disabled={this.state.loading}>
              <span>Criar / Atualizar { model }</span>
            </Button>
            <br/>
          </div>
        )
      case 'Pontuacao':
        return (
          <div>
            <h1>Pontuacao</h1>
            <form>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Item</ControlLabel>
                <FormControl componentClass="select" placeholder="select" onChange={this.selectItem}>
                  { 
                    this.state.Item.map(item => (<option key={item._id} value={item._id}>{item.nome}</option>))
                  }
                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Descrição</ControlLabel>
                <FormControl
                      id="formControlsPassword2"
                      type="text"
                      value={this.state.newPontuacao.descricao}
                      onChange={this.setPontuacaoDescricao}
                    />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Nota:</ControlLabel>
                <FormControl
                      id="formControlsPassword2"
                      type="number"
                      value={this.state.newPontuacao.nota}
                      onChange={this.setPontuacaoNota}
                    />
              </FormGroup>
            </form>
            <Button 
              bsStyle="success" 
              onClick={(e) => this.create(model)} 
              bsSize="sm" 
              block
              disabled={this.state.loading}>
              <span>Criar / Atualizar { model }</span>
            </Button>
            <br/>
          </div>
        )
      case 'Norma':
        return (
          <div>
            <h1>Norma</h1>
          </div>
        )
      case 'CriterioLegal':
        return (
          <div>
            <h1>Critério Legal</h1>
          </div>
        )
      case 'Entidade':
        return (
          <div>
            <h1>Entidade</h1>
          </div>
        )
      
      default:
        return (
          <h1>N/A</h1>
        )
    }
  }

  exportAvaliacoes = () => {
    Services.PontuacaoService.getAllPopulatedCsv(this.props.token)
      .then(res => {
        saveData(res, 'indicadores.csv')
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="Login">
        <NavbBar/>
        <div className="content">
          <header>
            <Grid fluid>
              <Row className="show-grid">
                <Col xs={12} md={9}>
                  <h1>Painel Gerencial</h1>
                </Col>
                <Col xs={12} md={3}>
                  <Button 
                    bsStyle="link" 
                    onClick={(e) => this.exportAvaliacoes()}>
                    Exportar tudo como CSV
                  </Button>
                </Col>
              </Row>
            </Grid>
          </header>
          <section>
            <Row>
              <Grid fluid>
                <Col md={3}>
                  <Treebeard
                      data={this.state.data}
                      onToggle={this.onToggle}
                      style={treeBeardStyle}
                  />
                </Col>
                <Col md={9}>
                  { this.renderForm(this.state.model) }
                  <Table>
                    <thead>
                      <tr>
                        <th>Referencia</th>
                        <th>Nome</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      { this.state.displayableItens.map((item) => {
                        return (
                          <tr key={item._id}>
                            <td style={style.ThirtyPercent}>{item.pai || 'N/A'}</td>
                            <td style={style.FiftyPercent}>{item.nome}</td>
                            <td style={style.TwentyPercent}>
                              <ButtonToolbar>
                                <Button bsStyle="primary" onClick={(e) => this.update(this.state.model, item)} >Editar</Button>
                                <Button bsStyle="danger" disabled>Deletar</Button>
                              </ButtonToolbar>
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

export let Gerenciaveis = connect(
  state => ({ 
    token: state.loginReducer.token,
  }),
  null
)(GerenciaveisClass)
 