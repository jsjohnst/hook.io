     __    __    ______     ______    __  ___         __    ______   
    |  |  |  |  /  __  \   /  __  \  |  |/  /        |  |  /  __  \  
    |  |__|  | |  |  |  | |  |  |  | |  '  /         |  | |  |  |  | 
    |   __   | |  |  |  | |  |  |  | |    <          |  | |  |  |  | 
    |  |  |  | |  `--'  | |  `--'  | |  .  \    __   |  | |  `--'  | 
    |__|  |__|  \______/   \______/  |__|\__\  (__)  |__|  \______/  

    the node.js web hook platform (aka yahoo crack pipes)

                                                                 
# Current Status :

ALL HANDS ON DECK FOR [SCURVYCONF](http://jsconf.us/2010/scurvy.html)
 
[v0.1](http://semver.org/) is almost out (i swear!)

hook.io [protocols](http://github.com/Marak/hook.io/tree/master/hookio/protocols/) : 6

hook.io webhook [listeners](http://github.com/Marak/hook.io/tree/master/hookio/definitions/hooks/) : 3

hook.io webhook [actions](HTB/docs/what-is-a-webhook.md): 4
##the webhook book (TWHB)

Table of Contents

1. [what is a webhook](#what-is-a-webhook)

1. [what is a webhook listener](#what-is-a-webhook-listener)

2. [what is a webhook action](#what-is-a-webhook-action)

3. [what is hook.io](#what-is-hookIO)

4. [installing hook.io](#installing-hookIO)

5. [putting a front-end on hook.io](#putting-a-front-end-on-hookIO)

6. [the hook.io api](#the-hookIO-api)

7. [using the JSON-RPC api gateway](#using-the-JSON-RPC)

8. [creating custom webhook listener and action definitions](#creating-custom-webhooks)

9. [creating custom hook.io protocols](#creating-custom-hookIO-protocols)

                                               
##TL;DR - low attention span? go here => [installing hookIO](#installing-hookIO)

#overview

hook.io is a open-source web hook platform built entirely in JavaScript and node.js. it is both a free open-source project and a free software as a service provided at [http://hook.io](http://hook.io)

hook.io's dual model is unique in that it allows developers and businesses the choice of using hook.io as a third party web-service or downloading and installing their own copy of hook.io and doing whatever they want with it, without limitation.

everything in hook.io is standardized, modular, evented and enumerable. we love standards and leverage the [CommonJS](http://commonjs.org/) module system for extending and customizing hook.io

hook.io is heavily linked with the [node.js](http://nodejs.org) project and [NYC.js](http://groups.google.com/group/nycjs), we share a few developers.

##what is a webhook platform?

a webhook platform is an application platform for automating simple actions to take place on arbitrary web events. a webhook platform can concurrently listen for millions of poll or push events and execute actions which are bound to these events. 

<a name = "what-is-a-webhook"/>
# what is a webhook?

a webhook is a listener which triggers at least one action<a name = "what-is-a-webhook-listener"/>
## what is a webhook listener?
the listener of a webhook is the event that needs to get triggered in order to execute the webhook's actions. for now, we will focus on three basic types of listeners.

###timer listeners
often a webhook listener will be based on a timer. the webhook will poll a resource on a set interval looking for a response. once the resource responds the webhook will execute its actions and pass along the payload received from the resource


###HTTP listeners
a webhook listener can also be implemented as a unique URL. any HTTP request performed on this unique URL will trigger the webhook, passing along the incoming HTTP request's payload to the webhook's actions

###socket listeners
perhaps one of the most powerful listeners, a socket listener will open up a socket with a resource and wait for that resource to push a response to the webhook. when the response is received it is passed along to the webhook's actions as they execute.<a name = "what-is-a-webhook-action"/>
# what is a webhook action?
the action of a webhook are the events that will executed once that webhook's listener is triggered. 

###what type of actions can a webhook have?

this is where things get interesting. the actual actions of a webhook are completely arbitrary. most of the time a webhook's action will be performing an outgoing HTTP request, but with access to custom hook.io protocols you can perform almost any action

### many actions, one webhook
a webhook may contain more then one action. there may be many actions attached to one listener. often, you will attach several actions to one webhook.

###chaining webhooks
a webhook's action may also point directly to another webhook. this essentially short circuits the webhooks listener and forces execution of the webhook. this means you can link webhooks together, passing along your payload from webhook to webhook and creating a chain of complex functionality
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
<a name = "installing-hookIO"/>
#installing hook.io

##requirements

1. [node.js](http://github.com/ry/node)

   
##download

    $ git clone git@github.com:Marak/hook.io.git
    $ cd hook.io
    $ git submodule update --init

##hook.io as a standalone server

    $ node server.js
    
this will start a hook.io instance on port 8000 of your machine.


##hook.io as a CommonJS module

    var hookIO = require('./hook.io/hookio/');
    hookIO.api.pingAPI();<a name = "putting-a-front-end-on-hookIO"/>
#putting a front-end on hook.io

hook.io is completely decoupled from any front-end. this is very powerful in that it allows developers to easily create customized front-ends or widgets in the technology stack of their choice

##getting started

if you want to put a quick front-end on hook.io you should clone the [hook.io-frontend-website](http://github.com/Marak/hook.io-frontend-website)

just serve the front-end site as static html on the same host where you are running hook.io. 

##creating a custom front-end / hook.io widget

hook.io provide's a [brower-side jQuery/JavaScript api](http://github.com/Marak/hook.io-frontend-website/blob/master/js/hookio/hookio.js) for communicating with hook.io's JSON-RPC

you can import this one JS file into your existing front-end site and easily all hook.io's api methods.

##setting up hook.io and nginx

nginx is an ideal choice for serving a front-end for hook.io

use this [nginx.conf](http://github.com/Marak/hook.io-frontend-website/blob/master/nginx.conf) file serve the hook.io-frontend-website and reverse proxy pass JSON-RPC requests to the running hook.io instance
<a name = "the-hookIO-api"/>
#the hook.io api

the hook.io api is the primary interface for interacting with hook.io

[/hookIO/api/](http://github.com/Marak/hook.io/tree/master/hookio/api/)

at it's most basic level you can interact with hook.io api through CommonJS.

hook.io can expose it's api over arbitrary gateways allowing easy integration other applications. 
<a name = "creating-custom-webhooks"/>
##what are hook.io's web hook and action definitions?

a web hook consists of an arbitrary listener and at least one arbitrary action. hook.io implements a hook dispatcher and an action dispatcher. the dispatchers validate configurations and delegate events to where they belong.

custom hook and action definitions might contain some of your business logic, but really they are meant only for routing purposes. if you need to define re-usable logic that can be spread across many definitions you will want to implement a hook.io protocol. 

a hook.io "protocol" in it's simplest form is a CommonJS module. you can create a hook.io protocol that does anything. check out our current protocols and node.js
# what would you build a hook.io protocol for?

really anything. if you wanted to integrate with Flickr, you would create the Flick.js hook.io protocol. now every single api method for Flickr can be called from a hook definition or an action definition.
