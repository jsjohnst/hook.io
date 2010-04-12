#putting a front-end on hook.io
<a name = "putting-a-front-end-on-hookIO"></a>

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
