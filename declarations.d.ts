export interface Attributes {
  [key: string]: string
}

export interface DomLib {
  findOne: (sel: string) => Element
  findAll: (sel: string) => NodeListOf<Element>
  createElement(tag: string, attr?: Attributes, children?: (string|Element)[]): Element
  append(parent: string|Element, children: Element[]): Element
  empty(parent: string|Element): Element
}

declare global {
  const dom: DomLib

  interface Window {
    dom: DomLib
  }
}
