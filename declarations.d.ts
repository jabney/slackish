declare module '*.svg' { export default undefined }

export interface INamespace {
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

type ActionType = 'update-namespaces'|'update-rooms'|'add-message'|'set-user'

export interface Action<T> {
  type: ActionType,
  payload?: T
}
