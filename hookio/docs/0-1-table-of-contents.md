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

