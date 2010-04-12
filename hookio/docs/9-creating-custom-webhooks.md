<a name = "creating-custom-webhooks"></a>
##what are hook.io's web hook and action definitions?

a web hook consists of an arbitrary listener and at least one arbitrary action. hook.io implements a hook dispatcher and an action dispatcher. the dispatchers validate configurations and delegate events to where they belong.

custom hook and action definitions might contain some of your business logic, but really they are meant only for routing purposes. if you need to define re-usable logic that can be spread across many definitions you will want to implement a hook.io protocol. 

a hook.io "protocol" in it's simplest form is a CommonJS module. you can create a hook.io protocol that does anything. check out our current protocols and node.js
