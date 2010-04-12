<a name = "what-is-hookIO"/>
#what is hook.io?

hook.io is an open-source webhook platform built entirely in JavaScript and [node.js](http://hook.io). it is both a free open-source project and a free software as a service provided at [http://hook.io](http://hook.io)

## hook.io as a software as a service

if you want to try hook.io without installing anything you can visit [http://hook.io](http://hook.io) and use the web interface. you can also integrate your application with hook.io's JSON-RPC webservice located @ [http://hook.io/api](http://hook.io/api)

## hook.io as stand-alone server

if you want to run hook.io on your own hardware you can easily git clone the [hook.io github repository](http://github.com/Marak/hook.io) and start your own hook.io instance. this instance is completely autonomous and doesn't communicate with any outside services unless you tell it to.

## hook.io as a CommonJS module

hook.io is a valid, self contained, [CommonJS](http://commonjs.org) module. this means you can import the hook.io module into an existing node.js application. once imported, you can seamlessly call hook.io methods through the hook.io api object which is exported as "hookIO.api"

## hook.io has no front-end
hook.io is completely decoupled from any front-end. this is very powerful in that it allows developers to easily create customized front-ends or widgets in the technology stack of their choice

we provide a sample front-end which powers [http://hook.io](http://hook.io), you can clone it @ [hook.io-frontend-website](http://github.com/Marak/hook.io-frontend-website)

we also provide a [brower-side jQuery/JavaScript api](http://github.com/Marak/hook.io-frontend-website/blob/master/js/hookio/hookio.js) for communicating with hook.io's JSON-RPC

JSONP support is coming soon.

## how does hook.io store data?
hook.io can work with Mongo, Redis, Couch, MySQL, and SQLlite, but hook.io comes embedded with [node-dirty](http://github.com/felixge/node-dirty) so you can persist data instantly without any third-party software. this means as soon as you start hook.io you have a database.
