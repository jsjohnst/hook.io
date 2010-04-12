<a name = "installing-hookIO"></a>
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
    hookIO.api.pingAPI();    