##installing hook.io

    git clone git@github.com:Marak/hook.io.git
    git submodule update --init
    node /hook.io/server.js

##hook.io as a standalone server

    node /hook.io/server.js
    
this will start a hook.io instance on port 8000 of your machine. 


##hook.io as a CommonJS module

    var hookIO = require('./hook.io/hookio/');

