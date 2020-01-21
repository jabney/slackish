import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { updateNamespaces, setSocket } from './store/actions'
import io from 'socket.io-client'

import LoginModal from './components/login-modal/login-modal.component'
import Namespaces from './components/namespaces/namespaces.component'
import Rooms from './components/rooms/rooms.component'
import Chat from './components/chat/chat.component'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

const socket = io()

const App = ({ setSocket, updateNamespaces }) => {
  /**
   * Set the global root socket.
   */
  const setSock = () => void setSocket(socket)
  useEffect(setSock, [])

  /**
   * Listen for namespaces and dispatch on receive.
   */
  const namespaces = () => {
    socket.on('namespaces', updateNamespaces)
    return () => socket.disconnect()
  }
  useEffect(namespaces, [])

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
  setSocket: (socket) => dispatch(setSocket(socket)),
  updateNamespaces: (nss) => dispatch(updateNamespaces(nss)),
})

export default connect(mapState, mapDispatch)(App)
