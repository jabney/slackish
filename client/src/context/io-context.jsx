import React from 'react'
import io from 'socket.io-client'

export const Context = React.createContext(null)

export const IoProvider = ({ children }) => {
  const socket = io(window.location.href)
  return <Context.Provider value={socket}>{children}</Context.Provider>
}
