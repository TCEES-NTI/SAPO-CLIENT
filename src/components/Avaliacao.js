import React, { Component } from 'react'
import { NavbBar } from './'
import { } from 'react-bootstrap';
import { connect } from 'react-redux'
import { ObjetoAvaliacaoService } from '../services'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const style = {
  tenPercent : {
    width: '10%',
    'textAlign': 'center' 
  },
  fivePercent : {
    width: '5%',
    'textAlign': 'center' 
  },
  twentyPercent : {
    width: '20%'
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

  render() {
    return (
      <div className="Login">
        <NavbBar/>
        <div className="content">
          <header>
            <h1>Avaliação</h1>
            <h2>{this.props.params.objetoAvaliacaoId}</h2>
          </header>
          <section>
          <Table responsive>
            <thead>
              <tr>
                <th style={style.twentyPercent}>Entidade</th>
                <th>Observacoes</th>
                <th style={style.tenPercent}>Resultado</th>
                <th style={style.fivePercent}>Completude(%)</th>
                <th style={style.tenPercent}>Ações</th>
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
                      <td style={style.tenPercent}>
                        <LinkContainer to={`/avaliacoes/${this.props.params.avaliacaoId}/objetoAvaliacao/${objetoAvaliacao._id}`}>
                          <Button bsStyle="primary">Editar</Button>
                        </LinkContainer>
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
 