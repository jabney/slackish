# Slackish

An interpretation of [socketioTheDetails/socketio201](https://github.com/robertbunch/socketioTheDetails/tree/master/socketio201)

I often like to make tutorial projects my own in some significant ways. That's what I've done here:
- Namespace data is served up via `json-server` and transformed dynamically into the `Namespace/Room` classes used by the app.
- Styles and DOM structure are customized/reimagined to some degree.
- Various custom abstractions have been added, such as the `namespace` service for interacting with a remote namespace data server.
- A DOM manipulation library has been implemented.
