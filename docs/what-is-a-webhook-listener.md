
## what is a webhook listener?
the listener of a webhook is the event that needs to get triggered in order to execute the webhook's actions. for now, we will focus on three basic types of listeners.

###timer listeners
often a webhook listener will be based on a timer. the webhook will poll a resource on a set interval looking for a response. once the resource responds the webhook will execute its actions and pass along the payload received from the resource


###HTTP listeners
a webhook listener can also be implemented as a unique URL. any HTTP request performed on this URL will trigger the webhook passing along the HTTP request payload to the webhooks actions

###socket listeners
perhaps one of the most powerful listeners, a socket listener will open up a socket with a resource and wait for that resource to push a response to the webhook. when the response is recieved it is passed along to the webhook's actions as they execute.