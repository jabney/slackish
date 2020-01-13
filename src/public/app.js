
(() => {
  const rootSocket = io(location.href)
  const adminSocket = io(location.href + 'admin')

  rootSocket.on('welcome', (msg) => {
    console.log(msg)
  })

  rootSocket.on('joined', (msg) => {
    console.log(msg)
  })

  adminSocket.on('welcome', (msg) => {
    console.log(msg)
  })

  /**
   * @type {HTMLInputElement}
   */
  const input = document.querySelector('input#user-message')
  const messages = document.querySelector('#messages')

  /**
   * @param {string} msg
   */
  function postMessage(msg) {
    const text = document.createTextNode(msg)
    const message = document.createElement('li')
    message.appendChild(text)
    messages.appendChild(message)
  }

  /**
   * @param {string} name
   * @param {string} msg
   */
  function postMsgToChannel(name, msg) {
    const message = document.createElement('li')
    const channel = document.createElement('span')
    channel.setAttribute('class', 'channel')
    channel.appendChild(document.createTextNode(name))
    message.appendChild(channel)
    message.appendChild(document.createTextNode(msg))
    messages.appendChild(message)
  }

  // document.querySelector('#message-form').addEventListener('submit', (event) => {
  //   event.preventDefault()
  //   const msg = input.value
  //   if (msg.length > 0) {
  //     input.value = ''
  //     rootSocket.emit('message', msg)
  //   }
  // })

  rootSocket.on('message', postMessage)
  adminSocket.on('message', postMsgToChannel.bind(null, 'admin'))
})()
