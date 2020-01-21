import React from 'react'
import { connect } from 'react-redux'
import { selectNamespace } from '../../store/actions'

import NamespaceItem from '../namespace-item/namespace-item.component'

import './namespaces.component.scss'

const Namespaces = ({ namespaces, selectNamespace }) => {
  return <div className="Namespaces">
    {
      namespaces.map(ns => <NamespaceItem key={ns.endpoint} ns={ns} onClick={selectNamespace} />)
    }
  </div>
}

const mapState = (state) => ({
  namespaces: state.namespaces
})

const mapDispatch = (dispatch) => ({
  selectNamespace: (ns) => dispatch(selectNamespace(ns)),
})

export default connect(mapState, mapDispatch)(Namespaces)
