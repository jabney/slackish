'use strict';

(() => {
  /**
   * @typedef {import('../../declarations').NsData} NsData
   */

  /**
   * @typedef {import('../../declarations').RoomData} RoomData
   */

  /**
   * @param {number} epochSec
   */
  function getFmtTime(epochSec) {
    const dt = new Date(epochSec)
    const hours = dt.getHours()
    const minutes = dt.getMinutes()
    const amPm = hours >= 12 ? 'pm' : 'am'
    return `${hours > 12 ? hours - 12 : hours}:${minutes} ${amPm}`
  }

  /**
   * Return a namespace div from namespace data.
   *
   * @param {(element: Element, ns: NsData) => void} cb
   * @param {NsData} ns
   */
  function nsToElement(cb, ns) {
    const img = dom.createElement('img', { src: ns.img })
    const div = dom.createElement('div', { class: 'namespace', ns: ns.endpoint }, [img])
    cb(div, ns)
    return div
  }

  /**
   * Return a room li from room data.
   *
   * @param {(element: Element, room: RoomData) => void} cb
   * @param {RoomData}  room
   */
  function roomToElement(cb, room) {
    const glyphicon = room.isPrivate ? 'glyphicon-lock' : 'glyphicon-globe'
    const span = dom.createElement('span', { class: `glyphicon ${glyphicon}` })
    const li = dom.createElement('li', {}, [span, room.title])
    cb(li, room)
    return li
  }

  /**
   *
   * @param {Element} element
   * @param {any} message
   */
  function appendMessage(element, { user, time, text, avatar }) {
    const fmtTime = getFmtTime(time)

    const userMsgDiv = dom.createElement('div', { class: 'user-message' }, [
      dom.createElement('div', { class: 'user-name-time' }, [
        dom.createElement('span', { class: 'name' }, [user]),
        dom.createElement('span', { class: 'time' }, [fmtTime]),
      ]),
      dom.createElement('div', { class: 'message-text' }, [text]),
    ])

    const imgDiv = dom.createElement('div', { class: 'user-image' }, [
      dom.createElement('img', { src: avatar })
    ])

    const li = dom.createElement('li', {}, [imgDiv, userMsgDiv])
    element.appendChild(li)
  }

  /**
   * Scroll to the bottom of the given element.
   *
   * @param {Element} element
   */
  function scrollToBottom(element) {
    element.scrollTo(0, element.scrollHeight)
  }

  /**
   * @type {import('../../declarations').DomHelpers}
   */
  const domHelpers = {
    nsToElement,
    roomToElement,
    appendMessage,
    scrollToBottom,
  }

  window.domHelpers = domHelpers
})()
