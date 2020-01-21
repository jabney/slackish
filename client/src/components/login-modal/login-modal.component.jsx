import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { connect } from 'react-redux'

import './login-modal.component.scss'

const LoginModal = () => {
  const [show, setShow] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    setName(localStorage.getItem('name'))
    setEmail(localStorage.getItem('email'))
  }, [])

  useEffect(() => localStorage.setItem('name', name), [name])
  useEffect(() => localStorage.setItem('email', email), [email])

  return <Modal show={show} onHide={() => setShow(false)}>
    <Modal.Header closeButton>
      <Modal.Title>Enter user info:</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Form.Group>
        <Form.Control type="text" placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Label></Form.Label>
        <Form.Control type="email" placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
    </Modal.Body>

    <Modal.Footer>
      {/* <Button variant="secondary" onClick={() => setShow(false)}>Close</Button> */}
      <Button variant="primary" onClick={() => setShow(false)}>Chat!</Button>
    </Modal.Footer>
  </Modal>
}

const mapState = (state) => ({
  user: state.user,
})

const mapDispatch = (dispatch) => ({})

export default connect(mapState, mapDispatch)(LoginModal)
