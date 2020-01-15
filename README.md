# Slackish

An interpretation of [socketioTheDetails/socketio201](https://github.com/robertbunch/socketioTheDetails/tree/master/socketio201)

![slackish screenshot](https://raw.githubusercontent.com/jabney/slackish/master/meta/images/slackish.png "Slackish")


This project is currenly 100% old-school JavaScript DOM - no frameworks, jQuery, webpack, or babel. The only client dependencies are Bootstrap and SocketIO.

I often like to make tutorial projects my own in some significant ways. That's what I've done here:
- A modest DOM manipulation library has been implemented. Helpers like `createElement` are usually used in lieu of setting strings on `innerHTML`.
- Namespace data is served up dynamically via `json-server` and transformed into the `Namespace/Room` classes used by the app.
- Styles and DOM structure are customized/reimagined to some degree.
- Various custom abstractions have been added, such as the `namespace` service for interacting with a remote namespace data server.

## Todo

- Implement flux data store on server and/or client. Data flow/consistency between client and server is sketchy at best, using callbacks and listeners coupled with emit calls. It would be preferable to treat the server as the data store, dispatch actions via `socket.io`, and have the server replicate state and/or actions back to the client.
- Persist chat data on the server.
- Replace old-school raw dom app with webpack/babel.
