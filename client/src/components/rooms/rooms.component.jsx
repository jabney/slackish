import React from 'react'
import { connect } from 'react-redux'

import './rooms.component.scss'

const Rooms = () => (
  <div className="Rooms">Rooms</div>
)

const mapState = () => ({})
const mapDispatch = () => ({})

export default connect(mapState, mapDispatch)(Rooms)
