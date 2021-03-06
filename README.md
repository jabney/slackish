# Slackish

A full-stack, SocketIO chat application styled loosely after Slack, using React/Redux on the client and NodeJS/Express/SocketIO on the server, sending flux actions to the client in response to IO events on the server.


![slackish screenshot](https://raw.githubusercontent.com/jabney/slackish/master/meta/images/slackish.png "Slackish")
[Slackish App on Heroku](https://slackish-app.herokuapp.com/)

## Version 2.1

Simplify IO logic by sending flux actions from the server to the client over the Socket.io connection.

## Version 2.0

This version reimplements everything from the bottom up using React and Redux on the client.

## Version 1.0

An interpretation of [socketioTheDetails/socketio201](https://github.com/robertbunch/socketioTheDetails/tree/master/socketio201)

This version is 100% old-school JavaScript DOM - no frameworks, jQuery, webpack, or babel. The only client dependencies are Bootstrap and SocketIO.

A modest DOM manipulation library has been implemented. Helpers like `createElement` and `addListener` are used in lieu of the standard JavaScript DOM functions.
