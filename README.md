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

creating a hook.io protocol is easy. just drop a CommonJS module into your /hookio/protocols/ directory and you have access to it. you can also add an exports.start function which hookIO will call when your protocol is first loaded. 



    
