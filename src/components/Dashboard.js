import React, { Component } from 'react'
import './PostList.css'
import { Jumbotron, Button, Grid, Row, Col } from 'react-bootstrap';
import { NavbBar } from './'
import { LinkContainer } from 'react-router-bootstrap'

export class Dashboard extends Component {

  render() {
    return (
      <div className="Dashboard">
        <NavbBar/>
          <div className="content">
           <Jumbotron>
            <div className="content">
              <h1>SAPO</h1>
              <p>Sistema de auditoria de portais</p>
              <br/>
              <Grid>
                <Row className="show-grid">
                  <Col xs={12} md={4}>
                    <LinkContainer to="avaliacoes">
                      <Button bsStyle="primary" bsSize="large" block>Avaliações</Button>
                    </LinkContainer>
                  </Col>
                  <Col xs={12} md={4}>
                    <LinkContainer to="criar-avaliacao">
                      <Button bsStyle="primary" bsSize="large" block>Criar Avaliação</Button>
                    </LinkContainer>
                  </Col>
                  <Col xs={12} md={4}>
                    <LinkContainer to="indicadores">
                      <Button bsStyle="primary" bsSize="large" block>Gerenciar Indicadores</Button>
                    </LinkContainer>
                  </Col>
                </Row>
              </Grid>
            </div>
          </Jumbotron>
        </div>
      </div>
    );
  }
}
