import React from 'react'
import { connect } from 'react-redux'

import './namespaces.component.scss'

const Namespaces = () => (
  <div className="Namespaces">Namespaces</div>
)

const mapState = () => ({})
const mapDispatch = () => ({})

export default connect(mapState, mapDispatch)(Namespaces)
