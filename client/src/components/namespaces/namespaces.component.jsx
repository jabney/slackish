import React from 'react'
import { connect } from 'react-redux'

import './namespaces.component.scss'
import NamespaceItem from '../namespace-item/namespace-item.component'

const Namespaces = ({ namespaces }) => {
  const onClick = (endpoint) => console.log(endpoint)

  return <div className="Namespaces">
    {
      namespaces.map(ns => <NamespaceItem key={ns.endpoint} ns={ns} onClick={onClick} />)
    }
  </div>
}

const mapState = (state) => ({
  namespaces: state.namespaces
})

const mapDispatch = () => ({})

export default connect(mapState, mapDispatch)(Namespaces)
