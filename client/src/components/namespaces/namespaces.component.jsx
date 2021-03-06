import React from 'react'
import { connect } from 'react-redux'
import { selectNamespace } from 'store/actions'

import NamespaceItem from 'components/namespace-item'

import './namespaces.component.scss'

/**
 * Display namespaces to join.
 */
const Namespaces = ({ namespaces, namespace, selectNamespace }) => {
  /**
   * @param {import('../../../../declarations').INsData} ns
   */
  const selected = (ns) => ns.endpoint === namespace.endpoint

  return <ul className="Namespaces">
    {
      namespaces.map(ns => <NamespaceItem key={ns.endpoint}
        ns={ns}
        selected={selected}
        onClick={selectNamespace}
      />)
    }
  </ul>
}

const mapState = (state) => ({
  namespaces: state.namespaces,
  namespace: state.namespace || {},
})

const mapDispatch = (dispatch) => ({
  selectNamespace: (ns) => dispatch(selectNamespace(ns)),
})

export default connect(mapState, mapDispatch)(Namespaces)
