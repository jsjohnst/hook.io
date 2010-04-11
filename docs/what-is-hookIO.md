
hook.io is really just a CommonJS module. the front-end you see at [http://hook.io](http://hook.io) is completely decoupled from the node.js instance running hook.io

the front-end for [http://hook.io](http://hook.io) is in fact open-source and can be found here: [hook.io-frontend-website](http://github.com/Marak/hook.io-frontend-website)

the current version of hook.io's browser-side JavaScript API can be found [here](http://github.com/Marak/hook.io-frontend-website/blob/master/js/hookio/hookio.js), roll your own front-end.

the hook.io API is currently exposed as JSON-RPC at [http://hook.io/api](http://hook.io/api), so can you consume this web-service with any language you want.


## where does my data go?
hook.io can work with Mongo, Redis, Couch, MySQL, and SQLlite, but hook.io comes embedded with node-dirty so you can persist data instantly without any third-party software.
