'use strict';

(() => {
  /**
   * Find all nodes that match the given selector.
   *
   * @param {string} selector
   *
   * @returns {NodeListOf<Element>}
   */
  function findAll(selector) {
    return document.querySelectorAll(selector)
  }

  /**
   * Find the first node that matches the given selector.
   *
   * @param {string} selector
   *
   * @returns {Element}
   */
  function findOne(selector) {
    return document.querySelector(selector)
  }

  /**
   * Create and return a DOM element.
   *
   * @param {string} tag
   * @param {{[key: string]: string}} [attr]
   * @param {Element[]} [children]
   *
   * @returns {Element}
   */
  function createElement(tag, attr = {}, children = []) {
    // Crete the root element.
    const element = document.createElement(tag)

    // Set attributes.
    Object.entries(attr).forEach(([key, value]) => element.setAttribute(key, value))

    // Append children.
    children.forEach((child) => {
      if (typeof child === 'string') {
        const text = document.createTextNode(child)
        element.appendChild(text)
      } else {
        element.appendChild(child)
      }
    })

    return element
  }

  /**
   * Append one or more children to a parent.
   *
   * @param {string|Element} parent An element or selector.
   * @param {Element[]} children
   *
   * @returns {Element}
   */
  function append(parent, children) {
    const element = typeof parent === 'string' ? findOne(parent) : parent

    if (element == null) {
      throw new Error(`element not found for selector ${parent}`)
    }

    children.forEach(child => element.appendChild(child))
    return element
  }

  /**
   * @param {string|Element} parent An element or selector.
   */
  function empty(parent) {
    const element = typeof parent === 'string' ? findOne(parent) : parent

    if (element == null) {
      throw new Error(`element not found for selector ${parent}`)
    }

    while(element.children.length > 0) {
      element.removeChild(element.lastChild)
    }

    return element
  }

  /**
   * @type {import('../../declarations').DomLib}
   */
  const domLib = {
    findAll,
    findOne,
    createElement,
    append,
    empty,
  }

  window.dom = domLib
})()
