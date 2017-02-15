import React, { Component } from 'react'
import { NavbBar } from './'
import { } from 'react-bootstrap';
import { connect } from 'react-redux'
import { AvaliacaoService } from '../services'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { browserHistory } from 'react-router'

const style = {
  tenPercent : {
    width: '10%',
    'textAlign': 'center' 
  },
  twentyPercent : {
    width: '20%'
  }
}

class AvaliacoesClass extends Component {
  constructor () {
    super()
    this.state = {
      avaliacoes: [],
      loading: false
    }
  }
  
  componentDidMount = () => {
    AvaliacaoService.getAllPopulated(this.props.token)
      .then((res) => {
        if (res.length) {
          console.log(res)
          this.setState({avaliacoes: res})
        }
      })
      .catch((err) => console.log(err))
  }

  setNavigate = (avaliacao) => {
    browserHistory.replace(`/avaliacoes/${avaliacao._id}`)
  }

  render() {
    return (
      <div className="Login">
        <NavbBar/>
        <div className="content">
          <header>
            <h1>Avaliações</h1>
            <h2>{this.props.params.avaliacaoId}</h2>
          </header>
          <section>
          <Table responsive>
            <thead>
              <tr>
                <th style={style.twentyPercent}>Indicador</th>
                <th>Nome</th>
                <th style={style.twentyPercent}>Data Início</th>
                <th style={style.tenPercent}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.avaliacoes.map((avaliacao) => {
                  return (
                    <tr key={avaliacao._id}>
                      <td style={style.twentyPercent}>{avaliacao.indicador.nome}</td>
                      <td>{avaliacao.nome}</td>
                      <td style={style.twentyPercent}>{avaliacao.dataInicio}</td>
                      <td style={style.tenPercent}>
                        <LinkContainer to={`/avaliacoes/${avaliacao._id}`}>
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

export let Avaliacoes = connect(
  state => ({ 
    token: state.loginReducer.token,
  }),
  null
)(AvaliacoesClass)
 