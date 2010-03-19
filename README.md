     __    __    ______     ______    __  ___         __    ______   
    |  |  |  |  /  __  \   /  __  \  |  |/  /        |  |  /  __  \  
    |  |__|  | |  |  |  | |  |  |  | |  '  /         |  | |  |  |  | 
    |   __   | |  |  |  | |  |  |  | |    <          |  | |  |  |  | 
    |  |  |  | |  `--'  | |  `--'  | |  .  \    __   |  | |  `--'  | 
    |__|  |__|  \______/   \______/  |__|\__\  (__)  |__|  \______/  
                                                                 
# Current Status : 
v0.1 is almost out. 3 hook definitions, 4 hook actions, 4 hook protocols


##hook.io as a standalone application

    node /hook.io/server.js
    

##hook.io as a module

    var hookIO = require('./hookio/hookio/');


# what is a web hook?

a web hook is an action and a listener

## what is an action?
the action of a web hook will be the events that are executed when your web hook is executed


## what is a listener?
the listener is the the event that gets triggered causing your web hook to executed


# what is a hook.io "protocol"?

a hook.io "protocol" is just like a regular protocol except you can create arbitrary protocols for doing anything. 

for instance if you wanted to integrate with Flickr, you would create the Flick.js protocol. now every single api method for Flickr can be called from a hook definition or an action definition.

creating a hook.io protocol is easy. just drop a CommonJS module into your /hookio/protocols/ directory and your hook definitions and hook actions will have access to it. you can also add an exports.start function which hookIO will call when your protocol is first loaded. 


##what are hook and action definitions?

since a web hook consists of a hook and an action, we must have definitions for these hooks and actions. hook.io currently ships with a few useful definitions, but custom definitions are easy to make.

###creating custom hook and action definitions

you can create custom definitions as CommonJS modules in /hookIO/definitions/actions/ and /hookIO/definitions/hooks/

every hook and action definition should export one method each

for hooks you will do :
    exports.hook = function(){
      // custom hook definition
    };

for actions :
    exports.action = function(){
      // custom hook action
    };


##putting a front-end on hook.io

here is a sample front-end which is currently the live front-end for [http://hook.io](http://hook.io), it uses HTML 4.01 and jQuery 1.4

[hook.io-frontend-website](http://github.com/Marak/hook.io-frontend-website)

