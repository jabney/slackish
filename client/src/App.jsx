import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import LoginModal from './components/login-modal/login-modal.component'
import Namespaces from './components/namespaces/namespaces.component'
import Rooms from './components/rooms/rooms.component'
import Chat from './components/chat/chat.component'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

const App = () => (
  <>
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
)

export default App
