export interface Attributes {
  [key: string]: string
}

export interface DomLib {
  findOne(sel: string): Element
  findAll(sel: string): NodeListOf<Element>
  createElement(tag: string, attr?: Attributes, children?: (string|Element)[]): Element
  append(parent: string|Element, children: Element[]): Element
  empty(parent: string|Element): Element
}

export interface NsData {
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

export interface IoHelpers {
  nsToElement(cb: (element: Element, ns: NsData) => void, ns: NsData): Element
  roomToElement(cb: (element: Element, room: RoomData) => void, room: RoomData): Element
}

declare global {
  const dom: DomLib
  const ioHelpers: IoHelpers

  interface Window {
    dom: DomLib
    ioHelpers: IoHelpers
  }
}
