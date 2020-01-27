import React from 'react'
import './namespace-item.component.scss'

/**
 * @type {React.FunctionComponent}
 */
const NamespaceItem = ({ ns, selected, onClick }) => (
  <li className={'NamespaceItem' + (selected(ns) ? ' selected' : '')}
    title={ns.title}
    onClick={() => onClick(ns)}
  >
    <img src={ns.img} alt={ns.title} />
  </li>
)

export default NamespaceItem
