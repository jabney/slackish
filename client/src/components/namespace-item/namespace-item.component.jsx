import React from 'react'
import './namespace-item.component.scss'

/**
 * @type {React.FunctionComponent}
 */
const NamespaceItem = ({ ns, onClick }) => (
  <div className="NamespaceItem" title={ns.title} onClick={() => onClick(ns)}>
    <img src={ns.img} alt={ns.title} />
  </div>
)

export default NamespaceItem
