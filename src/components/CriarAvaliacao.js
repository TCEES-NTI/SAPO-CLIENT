import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { NavbBar } from './'
import { connect } from 'react-redux'
import { IndicadorService, EntidadeService, ItemService, UserService, AvaliacaoService } from '../services'
import { PageHeader, FormGroup, FormControl, ControlLabel, Grid, Row, Col, Button, Table, Checkbox } from 'react-bootstrap'
import { browserHistory } from 'react-router'

const style = {
  fivePercent : {
    width: '5%',
    'textAlign': 'center' 
  },
  fifteenPercent : {
    width: '10%'
  },
  twentyPercent : {
    width: '20%'
  }

}

class CriarAvaliacaoClass extends Component {
  constructor () {
    super()
    this.state = {
      indicadores: [],
      selectedIndicador:'',
      nome: '',
      objetivos: '',
      observacoes: '',
      entidades: [],
      selectedEntidades: {},
      itens: [],
      filteredItens: [],
      users: [],
      selectedUsers: [],
      loading: false
    }
  }
  
  componentDidMount = () => {
    IndicadorService.getAll(this.props.token)
      .then((res) => {
        if (res.length) {
          this.setState({indicadores: res})
          console.log(res[0]._id)
          this.selectIndicador({ target: { value: res[0]._id } })
        }
        return EntidadeService.getAll(this.props.token) 
      })
      .then((res) => {
        if (res.length) {
          this.setState({entidades: res})
        }
        return ItemService.getAllPopulated(this.props.token)
      })
      .then((res) => {
        if (res.length) {
          this.setState({itens: res})
          this.filterItens(this.state.itens, this.state.selectIndicador)
        }
        return UserService.getAllUsername(this.props.token)         
      })
      .then((res) => {
        if (res.length) {
          this.setState({users: res})
        }
      })
      .catch((err) => console.log(err))
  }
  
  filterItens = (itens) => {
    console.log(itens.length, this.state.selectedIndicador)
    this.setState({ filteredItens: itens.filter((item) => {
        return item.subnivel.nivel.tipo.pilar.indicador._id === this.state.selectedIndicador
      }).map((item) => {
        item.selected = true
        return item
      })
    })
  }

  selectIndicador = (e) => {
    this.setState({ selectedIndicador: e.target.value })
    this.filterItens(this.state.itens, e.target.value)
  }

  setNome = (e) => this.setState({ nome: e.target.value })
  setObjetivos = (e) => this.setState({ objetivos: e.target.value })
  setObservacoes = (e) => this.setState({ observacoes: e.target.value })
  selectEntidades = (e) => {
    var mutate = this.state.selectedEntidades
    mutate[e.target.getAttribute("data-key")] = [].filter.call(e.target.options, (option) => option.selected).map((option) => option.value)
    return this.setState({ selectedEntidades: mutate })
  }

  clearEntidadesSelection = (e) => {
    let select = findDOMNode(this.refs[e.target.getAttribute("data-key")])
    ;[].forEach.call(select, (option) => {
      option.selected = false
    })
    var mutate = this.state.selectedEntidades
    mutate[e.target.getAttribute("data-key")] = []
    return this.setState({ selectedEntidades: mutate })
  }

  setItensSelection = (variation) => {
    let newFilteredItens = this.state.filteredItens.map((item) => {
      item.selected = variation
      return item
    })
    return this.setState({ filteredItens: newFilteredItens })
  }

  toggleItem = (e) => {
    console.log('Aqui', e.target, e.target.getAttribute("data-key"))
    let mutate = this.state.filteredItens.map((item) => {
      if (item._id === e.target.getAttribute("data-key")) {
        item.selected = !item.selected
      }
      return item
    })
    return this.setState({ filteredItens: mutate })
  }

  selectUsers = (e) => {
    var mutate = this.state.selectedEntidades
    mutate = [].filter.call(e.target.options, (option) => option.selected).map((option) => option.value)
    return this.setState({ selectedUsers: mutate })
  }

  createAvaliacao = () => {
    this.setState({ loading: true })
    return AvaliacaoService.create(this.props.token, {
      indicador: this.state.selectedIndicador,
      nome: this.state.nome,
      objetivos: this.state.objetivos,
      observacoes: this.state.observacoes,
      entidades: this.state.selectedEntidades,
      itens: this.state.filteredItens,
      usuarios: this.state.selectedUsers
    })
      .then((res) => {
        console.log(res)
        this.setState({ loading: false })
        browserHistory.replace("/")
      })
  }

  render() {
    let poderesEntidades = this.state.entidades.reduce((result, actual) => {
      if (result.indexOf(actual.poder) === -1) {
        result.push(actual.poder)
      }
      return result
    }, [])
    return (
      <div className="Login">
        <NavbBar/>
        <div className="content">
          <PageHeader>Nova Avaliação</PageHeader>
          <form>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Indicador</ControlLabel>
              <FormControl componentClass="select" placeholder="select" onChange={this.selectIndicador}>
                { 
                  this.state.indicadores.map(indicador => (<option key={indicador._id} value={indicador._id}>{indicador.nome}</option>))
                }
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Nome</ControlLabel>
              <FormControl
                    id="formControlsPassword2"
                    type="text"
                    value={this.state.nome}
                    onChange={this.setNome}
                  />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Objetivos</ControlLabel>
              <FormControl
                    id="formControlsPassword2"
                    type="text"
                    value={this.state.objetivos}
                    onChange={this.setObjetivos}
                  />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Observacoes</ControlLabel>
              <FormControl
                    id="formControlsPassword2"
                    type="text"
                    value={this.state.observacoes}
                    onChange={this.setObservacoes}
                  />
            </FormGroup>
            <ControlLabel>Entidades</ControlLabel>
            <Grid fluid={true}>
              <Row className="show-grid">
                { poderesEntidades.map((poder) => {
                  return (
                    <Col xs={12} md={ 12 / poderesEntidades.length } key={ poder ? poder : 'Outros'}>
                      <FormGroup controlId="formControlsSelectMultiple">
                        <ControlLabel>{ poder ? poder : 'Outros'}</ControlLabel>
                        <FormControl 
                          componentClass="select" 
                          multiple size="15"
                          ref={ poder ? poder : 'Outros'}
                          data-key={ poder ? poder : 'Outros'} 
                          onChange={this.selectEntidades}>
                          {
                            this.state.entidades.filter((entidade) => entidade.poder === poder)
                              .map((entidade) => {
                                return (
                                  <option value={entidade._id} key={entidade._id}>{entidade.nome}</option>
                                )
                              })
                          }
                        </FormControl>
                        <Button 
                          bsStyle="danger" 
                          onClick={this.clearEntidadesSelection} 
                          bsSize="small" 
                          data-key={ poder ? poder : 'Outros'} 
                          block>Limpar seleção</Button>
                      </FormGroup>
                    </Col>
                  )
                })}
                
              </Row>
            </Grid>
            <ControlLabel>Itens referentes ao indicador:&nbsp;
              {
                this.state.indicadores
                  .filter((indicador) => indicador._id === this.state.selectedIndicador)
                  .map((indicador) => (<span key={indicador._id}>{indicador.nome}</span>))
              }
            </ControlLabel>
            <Grid fluid={true}>
              <Row className="show-grid">
                <Col sm={12} md={6}>
                  <Button 
                    bsStyle="danger" 
                    onClick={(e) => this.setItensSelection(false)} 
                    bsSize="small" 
                    block>Desselecionar todos itens</Button>

                </Col>
                <Col sm={12} md={6}>
                  <Button 
                    bsStyle="success" 
                    onClick={(e) => this.setItensSelection(true)} 
                    bsSize="small" 
                    block>Selecionar todos itens</Button>
                </Col>
              </Row>
            </Grid>
            <br/>
            <Table responsive striped bordered condensed hover>
              <thead>
                <tr>
                  <th style={style.twentyPercent}>Nome</th>
                  <th>Exigência</th>
                  <th style={style.fifteenPercent}>Nota Maxima</th>
                  <th style={style.fivePercent}>Incluir</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.filteredItens.map((item) => {
                    return (
                      <tr 
                        key={item._id}
                        onClick={this.toggleItem}
                        data-key={item._id}
                        className={item.selected ? "success" : "default"}>
                        <td data-key={item._id}>{item.nome}</td>
                        <td data-key={item._id}>{item.exigencia}</td>
                        <td data-key={item._id}>{item.notaMaxima}</td>
                        <td style={style.fivePercent} data-key={item._id}>
                          <FormGroup data-key={item._id}>
                            <Checkbox 
                              inline 
                              data-key={item._id} 
                              checked={item.selected}
                              onChange={() => {return}}/>
                          </FormGroup>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
            <FormGroup controlId="formControlsSelectMultiple">
              <ControlLabel>Usuarios avaliadores</ControlLabel>
              <FormControl 
                componentClass="select" 
                multiple size="10"
                onChange={this.selectUsers}>
                {
                  this.state.users
                    .map((user) => {
                      return (
                        <option value={user._id} key={user._id}>{user.username} - {user.name}</option>
                      )
                    })
                }
              </FormControl>
            </FormGroup>
            <Button 
              bsStyle="success" 
              onClick={(e) => this.createAvaliacao()} 
              bsSize="large" 
              block
              disabled={this.state.loading}>
              <span>Criar avaliação</span>
            </Button>
            <br/>
          </form>
        </div>
      </div>
    );
  }
}

export let CriarAvaliacao = connect(
  state => ({ 
    token: state.loginReducer.token,
  }),
  null
)(CriarAvaliacaoClass)
 