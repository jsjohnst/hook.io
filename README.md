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

hook.io [protocols](http://github.com/Marak/hook.io/tree/master/hookio/protocols/) : 4

hook.io web hook [listeners](http://github.com/Marak/hook.io/tree/master/hookio/definitions/hooks/) : 3

hook.io web hook [actions](http://github.com/Marak/hook.io/tree/master/hookio/definitions/actions/): 4


##installing hook.io

    git clone git@github.com:Marak/hook.io.git
    git submodule update --init
    node /hook.io/server.js

##hook.io as a standalone server

    node /hook.io/server.js
    
this will start a hook.io instance on port 8000 of your machine. 


##hook.io as a CommonJS module

    var hookIO = require('./hook.io/hookio/');


hook.io is really just a CommonJS module. the front-end you see at [http://hook.io](http://hook.io) is completely decoupled from the node.js instance running hook.io

the front-end for [http://hook.io](http://hook.io) is in fact open-source and can be found here: [hook.io-frontend-website](http://github.com/Marak/hook.io-frontend-website)

the current version of hook.io's browser-side JavaScript API can be found [here](http://github.com/Marak/hook.io-frontend-website/blob/master/js/hookio/hookio.js), roll your own front-end.

the hook.io API is currently exposed as JSON-RPC at [http://hook.io/api](http://hook.io/api), so can you consume this web-service with any language you want.


## where does my data go?
hook.io can work with Mongo, Redis, Couch, MySQL, and SQLlite, but hook.io comes embedded with node-dirty so you can persist data instantly without any third-party software.

# what is a web hook?

a web hook is a listener which triggers at least one action

## what is a web hook listener?
the listener is the event that gets triggered causing your web hook to be executed

## what is a web hook action?
the action of a web hook will be the events that are triggered when your web hook is executed. the actual events that occur are arbitrary (they can be anything)

one listener => many actions

##what are hook.io's web hook and action definitions?

a web hook consists of an arbitrary listener and at least one arbitrary action. hook.io implements a hook dispatcher and an action dispatcher. the dispatchers validate configurations and delegate events to where they belong.

custom hook and action definitions might contain some of your business logic, but really they are meant only for routing purposes. if you need to define re-usable logic that can be spread across many definitions you will want to implement a hook.io protocol. 

a hook.io "protocol" in it's simplest form is a CommonJS module. you can create a hook.io protocol that does anything. check out our current protocols and node.js


# what would you build a hook.io protocol for?

really anything. if you wanted to integrate with Flickr, you would create the Flick.js hook.io protocol. now every single api method for Flickr can be called from a hook definition or an action definition.

