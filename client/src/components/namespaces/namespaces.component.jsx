import React from 'react'
import { connect } from 'react-redux'

import './namespaces.component.scss'
import NamespaceItem from '../namespace-item/namespace-item.component'

const Namespaces = ({ namespaces }) => (
  <div className="Namespaces">
    {
      namespaces.map(ns => <NamespaceItem key={ns.endpoint} ns={ns} />)
    }
  </div>
)

const mapState = (state) => ({
  namespaces: state.namespaces
})

const mapDispatch = () => ({})

export default connect(mapState, mapDispatch)(Namespaces)
