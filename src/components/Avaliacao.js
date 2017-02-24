import React, { Component } from 'react'
import { NavbBar } from './'
import { } from 'react-bootstrap';
import { connect } from 'react-redux'
import { ObjetoAvaliacaoService, NotaService } from '../services'
import { Button, Table, Grid, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { saveData } from '../utils/DataExport'

const style = {
  tenPercent : {
    width: '10%',
    'textAlign': 'center' 
  },
  fifteenPercent : {
    width: '15%',
    'textAlign': 'center' 
  },
  fivePercent : {
    width: '5%',
    'textAlign': 'center' 
  },
  twentyPercent : {
    width: '20%'
  },
  'margin-left': {
    marginLeft: '5px'
  }
}

class AvaliacaoClass extends Component {
  constructor () {
    super()
    this.state = {
      objetosAvaliacoes: [],
      loading: false
    }
  }
  
  componentDidMount = () => {
    ObjetoAvaliacaoService.getPopulated(this.props.token, this.props.params.avaliacaoId)
      .then((res) => {
        if (res.length) {
          console.log(res)
          this.setState({objetosAvaliacoes: res})
        }
      })
      .catch((err) => console.log(err))
  }

  exportAvaliacao = (id) => {
    NotaService.getPopulatedCsv(this.props.token, id)
      .then(res => {
        saveData(res, 'avaliacao.csv')
      })
      .catch(err => console.log(err))
  }

  exportAvaliacoes = () => {
    return Promise.all(this.state.objetosAvaliacoes.map(objetoAvaliacao => {
        return NotaService.getPopulatedCsv(this.props.token, objetoAvaliacao._id)
      }))
      .then(res => {
        console.log('DEI CERTO!')
        let completeResponse = res.reduce((result, actual) => {
          return result.concat(actual)
        }, '')
        saveData(completeResponse, 'avaliacao.csv')
      })
      .catch(err => console.log(err))
  }

  getNomeAvaliacao = () => {
    if ( this.state.objetosAvaliacoes.length ) {
      return (
        <h1>Avaliação > {this.state.objetosAvaliacoes[0].avaliacao.nome}</h1>
      )
    } else {
      return (
        <h1>Avaliação > Carregando</h1>
      )
    }
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
                { this.getNomeAvaliacao() }
              </Col>
              <Col xs={12} md={3}>
                <Button 
                  bsStyle="link" 
                  onClick={(e) => this.exportAvaliacoes()}>
                  Exportar todas entidades como CSV
                </Button>
              </Col>
            </Row>
          </Grid>
          </header>
          <section>
          <Table responsive>
            <thead>
              <tr>
                <th style={style.twentyPercent}>Entidade</th>
                <th>Observacoes</th>
                <th style={style.tenPercent}>Resultado</th>
                <th style={style.fivePercent}>Completude(%)</th>
                <th style={style.fifteenPercent}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.objetosAvaliacoes.map((objetoAvaliacao) => {
                  return (
                    <tr key={objetoAvaliacao._id}>
                      <td style={style.twentyPercent}>{objetoAvaliacao.entidade.nome}</td>
                      <td>{objetoAvaliacao.observacoes}</td>
                      <td style={style.tenPercent}>{objetoAvaliacao.resultado} / {objetoAvaliacao.notaMaxima}</td>
                      <td style={style.fivePercent}>{objetoAvaliacao.completude} %</td>
                      <td style={style.fifteenPercent}>
                        <LinkContainer to={`/avaliacoes/${this.props.params.avaliacaoId}/objetoAvaliacao/${objetoAvaliacao._id}`}>
                          <Button bsStyle="primary">Avaliar</Button>
                        </LinkContainer>
                        <Button 
                          bsStyle="warning" 
                          style={style['margin-left']} 
                          onClick={(e) => this.exportAvaliacao(objetoAvaliacao._id)}>
                          Exportar
                        </Button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
            
          </section>
        </div>
      </div>
    );
  }
}

export let Avaliacao = connect(
  state => ({ 
    token: state.loginReducer.token,
  }),
  null
)(AvaliacaoClass)
 