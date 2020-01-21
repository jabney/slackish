declare module '*.svg' { export default undefined }

export interface INsData {
  title: string
  img: string
  endpoint: string
}

export interface IRoom {
  id: number
  title: string
  nsTitle: string
  isPrivate: boolean
  history: string[]
}

export interface IChatMessage {
  name: string
  time: string
  text: string
  avatar: string
}

export interface IUser {
  name: string
  email: string
}

export interface INamespace extends INsData {
  rooms: IRoom[]
  room: string
  users: number
  history: IChatMessage[]
  socket: SocketIOClient.Socket
}

type ActionType = 'update-namespaces'|'update-rooms'|'add-message'|'set-user'
  |'set-socket'|'set-namespace'|'select-room'|'set-room-count'|'set-room-history'

export interface Action<T> {
  type: ActionType,
  payload?: T
}

export interface Store {
  namespaces: INamespace[],
  namespace: INamespace,
  user: IUser,
}
