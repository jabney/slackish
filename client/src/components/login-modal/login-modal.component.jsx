import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { setUser } from '../../store/actions'
import { connect } from 'react-redux'

import './login-modal.component.scss'

const LoginModal = ({ setUser }) => {
  const [show, setShow] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    setName(localStorage.getItem('name'))
    setEmail(localStorage.getItem('email'))
  }, [])

  useEffect(() => localStorage.setItem('name', name), [name])
  useEffect(() => localStorage.setItem('email', email), [email])

  const formIsValid = name.length > 0 && email.length > 0

  const onClose = () => {
    if (formIsValid) {
      setUser({ name, email })
      setShow(false)
    }
  }

  return <Modal show={show} onHide={onClose} className='LoginModal'>
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
      <Form.Text className='error' hidden={!showError || formIsValid}>
        Please provide name and email
      </Form.Text>
      <Button variant={formIsValid ? 'primary' : 'secondary'}
        style={{
          cursor: formIsValid ? 'pointer' : 'not-allowed',
          color: formIsValid ? 'white' : 'lightgray',
        }}
        onMouseOver={() => setShowError(true)}
        onMouseOut={() => setShowError(false)}
        onClick={onClose}
      >
        Chat!
      </Button>
    </Modal.Footer>
  </Modal>
}

const mapState = (state) => ({})

const mapDispatch = (dispatch) => ({
  setUser: (user) => setUser(user),
})

export default connect(mapState, mapDispatch)(LoginModal)
