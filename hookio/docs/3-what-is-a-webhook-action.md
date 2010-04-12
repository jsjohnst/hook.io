<a name = "what-is-a-webhook-action"/>
# what is a webhook action?
the action of a webhook are the events that will executed once that webhook's listener is triggered. 

###what type of actions can a webhook have?

this is where things get interesting. the actual actions of a webhook are completely arbitrary. most of the time a webhook's action will be performing an outgoing HTTP request, but with access to custom hook.io protocols you can perform almost any action

### many actions, one webhook
a webhook may contain more then one action. there may be many actions attached to one listener. often, you will attach several actions to one webhook.

###chaining webhooks
a webhook's action may also point directly to another webhook. this essentially short circuits the webhooks listener and forces execution of the webhook. this means you can link webhooks together, passing along your payload from webhook to webhook and creating a chain of complex functionality
