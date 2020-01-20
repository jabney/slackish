import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

const App = () => (
  <Container fluid className='App no-gutter'>
    <Row className="frame no-gutter">
      <Col xs={1} className='namespace no-gutter'></Col>
      <Col xs={3} className='room'></Col>
      <Col xs={8} className='chat'></Col>
    </Row>
  </Container>
)

export default App;
