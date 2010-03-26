     __    __    ______     ______    __  ___         __    ______   
    |  |  |  |  /  __  \   /  __  \  |  |/  /        |  |  /  __  \  
    |  |__|  | |  |  |  | |  |  |  | |  '  /         |  | |  |  |  | 
    |   __   | |  |  |  | |  |  |  | |    <          |  | |  |  |  | 
    |  |  |  | |  `--'  | |  `--'  | |  .  \    __   |  | |  `--'  | 
    |__|  |__|  \______/   \______/  |__|\__\  (__)  |__|  \______/  

    the free web hook platform (aka yahoo crack pipes)
                                                                 
# Current Status : 
[v0.1](http://semver.org/) is almost out. 

hook.io [protocols](http://github.com/Marak/hook.io/tree/master/hookio/protocols/) : 4

hook.io web hook [listeners](http://github.com/Marak/hook.io/tree/master/hookio/definitions/hooks/) : 3

hook.io web hook [actions](http://github.com/Marak/hook.io/tree/master/hookio/definitions/actions/): 4


##installing hook.io

    git clone git@github.com:Marak/hook.io.git
    git submodule update --init
    node /hook.io/server.js

## where does my data go?
hook.io can work with Mongo, Redis, Couch, MySQL, and SQLlite, but hook.io comes embedded with node-dirty so you can persist data instantly without any third-party software.

##hook.io as a standalone server

    node /hook.io/server.js
    
this will start a hook.io instance on port 8000 of your machine. 


##hook.io as a CommonJS module

    var hookIO = require('./hook.io/hookio/');


# what is a web hook?

a web hook is a listener which triggers an action

## what is a web hook listener?
the listener is the event that gets triggered causing your web hook to be executed

## what is a web hook action?
the action of a web hook will be the events that are triggered when your web hook is executed. the actually events that occur are arbitrary (they can be anything) 

##what are hook.io's web hook and action definitions?

web hooks consist of an arbitrary listener and an arbitrary action. hook.io implements a hook dispatcher and an action dispatcher. these accepts custom hook and action definitions, validate configurations, and delegate events to where they belong.

custom hook and action definitions might contain some of your business logic, but really they are meant only for routing purposes. if you need to define re-usable logic that can be spread across many definitions you will want to implement a hook.io protocol. 

a hook.io "protocol" in it's simplest form is a CommonJS module. you can create a hook.io protocol that does anything. check out our current protocols and node.js


# what would you build a hook.io protocol for?

really anything. if you wanted to integrate with Flickr, you would create the Flick.js hook.io protocol. now every single api method for Flickr can be called from a hook definition or an action definition.


##putting a front-end on hook.io

here is a sample front-end which is currently the live front-end for [http://hook.io](http://hook.io), it uses HTML 4.01 and jQuery 1.4

[hook.io-frontend-website](http://github.com/Marak/hook.io-frontend-website)






