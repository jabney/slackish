declare module '*.svg' { export default undefined }

export interface NamespaceData {
  title: string
  img: string
  endpoint: string
}

export interface RoomData {
  id: number
  title: string
  nsTitle: string
  isPrivate: boolean
  history: string[]
}

export interface ChatMessageData {
  name: string
  time: string
  text: string
  avatar: string
}

export interface UserData {
  name: string
  email: string
}

type ActionType = 'update-namespaces'|'update-rooms'|'add-message'|'set-user'

export interface Action<T> {
  type: ActionType,
  payload?: T
}
