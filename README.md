# Slackish

An interpretation of [socketioTheDetails/socketio201](https://github.com/robertbunch/socketioTheDetails/tree/master/socketio201)

I often like to make tutorial projects my own in some significant ways. That's what I've done here:
- Namespace data is served up dynamically via `json-server` and transformed into the `Namespace/Room` classes used by the app.
- Styles and DOM structure are customized/reimagined to some degree.
- Various custom abstractions have been added, such as the `namespace` service for interacting with a remote namespace data server.
- A modest DOM manipulation library has been implemented.

## Todo

- Implement flux data store on server and/or client.
- Persist chat data on the server.
