import React from 'react'
import './namespace-item.component.scss'

/**
 * @type {React.FunctionComponent}
 */
const NamespaceItem = ({ ns, selected, onClick }) => (
  <div className={'NamespaceItem' + (selected ? ' selected' : '')}
    title={ns.title}
    onClick={() => onClick(ns)}
  >
    <img src={ns.img} alt={ns.title} />
  </div>
)

export default NamespaceItem
