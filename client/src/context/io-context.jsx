import React from 'react'
import io from 'socket.io-client'

export const IoContext = React.createContext(null)

export const IoProvider = ({ children }) => {
  const socket = io(window.location.href)
  return <IoContext.Provider value={socket}>{children}</IoContext.Provider>
}
