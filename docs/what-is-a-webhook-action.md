## what is a webhook action?
the action of a webhook will be the events that are executed when your webhook listener is triggered. 


###what types of actions are executed?

this is where things get interesting. the actual actions of a webhook are completely arbitrary. most of the time a webhook's action will be a simple HTTP request, but with access to custom hook.io protocols you can perform almost any action


### many actions, one webhook
a webhook may contain more then one action. often, you will attach severals actions to one webhook.

###chaining webhooks
a webhook's action may also point directly to another webhook. this essentially short circuits the webhooks listener and forces execution of the webhook. this means you can link webhooks together, passing along your payload from webhook to webhook, creating a chain of complex functionality
