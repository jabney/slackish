import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { updateNamespaces } from './store/actions'

import LoginModal from './components/login-modal/login-modal.component'
import Namespaces from './components/namespaces/namespaces.component'
import Rooms from './components/rooms/rooms.component'
import Chat from './components/chat/chat.component'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

import io from 'socket.io-client'

const App = ({ updateNamespaces }) => {
  const socket = io()

  socket.on('namespaces', (namespaces) => {
    updateNamespaces(namespaces)
  })

  return <>
    <LoginModal />
    <Container fluid className='App no-gutter'>
      <Row className="frame no-gutter">
        <Col xs={1} className='namespace no-gutter'>
          <Namespaces />
        </Col>
        <Col xs={3} className='room'>
          <Rooms />
        </Col>
        <Col xs={8} className='chat'>
          <Chat />
        </Col>
      </Row>
    </Container>
  </>
}

const mapState = (state) => ({})

const mapDispatch = (dispatch) => ({
  updateNamespaces: (nss) => dispatch(updateNamespaces(nss))
})

export default connect(mapState, mapDispatch)(App)
