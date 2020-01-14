'use strict';

(() => {
  /**
   * @typedef {import('../../declarations').NsData} NsData
   */

  /**
   * @typedef {import('../../declarations').RoomData} RoomData
   */

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
   * @type {import('../../declarations').IoHelpers}
   */
  const ioHelpers = {
    nsToElement,
    roomToElement,
  }

  window.ioHelpers = ioHelpers
})()
