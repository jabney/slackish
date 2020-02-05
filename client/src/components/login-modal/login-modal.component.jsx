import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { setUser } from 'store/actions'
import { connect } from 'react-redux'

import './login-modal.component.scss'

/**
 * Display a form to collect information about the chatting user.
 */
const LoginModal = ({ setUser }) => {
  // Show/hide the modal.
  const [showModal, setShowModal] = useState(true)

  // User name and email address.
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  // Incomplete form error message.
  const [showError, setShowError] = useState(false)

  // Set state from local storage.
  useEffect(() => {
    setName(localStorage.getItem('name') || '')
    setEmail(localStorage.getItem('email') || '')
  }, [])

  // Update local storage when name changes.
  useEffect(() => {
    setShowError(false)
    localStorage.setItem('name', name)
  }, [name])

  // Update local storage when email changes.
  useEffect(() => {
    setShowError(false)
    localStorage.setItem('email', email)
  }, [email])

  // Form is filled out.
  const formIsValid = name.length > 0 && email.length > 0

  /**
   * Handle close button clicks.
   */
  const onClose = (e) => {
    if (e) { e.preventDefault() }

    if (formIsValid) {
      setUser({ name, email })
      setShowModal(false)
    } else {
      setShowError(true)
    }
  }

  // *** DEBUG ***
  // *** DEBUG ***
  // *** DEBUG ***
  // useEffect(onClose, [name, email])

  return <Modal show={showModal} onHide={onClose} className='LoginModal'>
    <Modal.Header closeButton>
      <Modal.Title>Enter user info:</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Form onSubmit={onClose}>
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
          <Form.Control type="submit" style={{display: 'none'}} />
        </Form.Group>
      </Form>
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

const mapDispatch = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
})

export default connect(null, mapDispatch)(LoginModal)
