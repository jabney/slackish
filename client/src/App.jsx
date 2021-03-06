import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { updateNamespaces } from './store/actions'
import io from 'socket.io-client'

import LoginModal from './components/login-modal'
import Namespaces from './components/namespaces'
import Rooms from './components/rooms'
import Chat from './components/chat'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

const App = ({ updateNamespaces }) => {
  /**
   * Initialize IO socket and listen for namespaces from the server.
   */
  const initSocket = () => {
    const socket = io()
    socket.on('namespaces', updateNamespaces)
    return () => socket.disconnect()
  }

  // Initialization.
  useEffect(initSocket, [])

  return <>
    <LoginModal />
    <Container fluid className='App no-gutter'>
      <Row className="frame no-gutter">
        <Col sm={1} className='namespace no-gutter'>
          <Namespaces />
        </Col>
        <Col sm={3} className='room'>
          <Rooms />
        </Col>
        <Col sm={8} className='chat'>
          <Chat />
        </Col>
      </Row>
    </Container>
  </>
}

const mapDispatch = (dispatch) => ({
  updateNamespaces: (nss) => dispatch(updateNamespaces(nss)),
})

export default connect(null, mapDispatch)(App)
