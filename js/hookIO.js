var hookIO = {};

hookIO.createHooks = function(options){
 debug.log(options);
 $.postJSON('http://hook.io:8000/api',options,function(rsp){
 debug.log(rsp);
 });
};



var hooksStub = {
 "listener" : {
 "twitter" : {
 "username" : "maraksquires"
 },
 "hookiolistener" : {
 "uri" : "/CustomURL123/etc/foo"
 },
 "timer" : {
 "interval" : "60",
 "count" : "0"
 }
 },
 "action" : {
 "httpRequest" : {
 "url" : "http://maraksquires.com/ping",
 "method" : "POST",
 "payload" : {
 "foo" : "bar",
 "poo" : "bear"
 }
 },
 "email" : {
 "to" : "marak.squires@gmail.com",
 "from" : "obama@whitehouse.gov",
 "bbc" : "",
 "subject" : "hook.io is awesome!",
 "message" : "congrats on your new internet business. i have transferred two million internet dollars to your account"
 },
 "twitterUpdate" : {
 "username" : "maraksquires",
 "password" : "twitterisstupid"
 }
 }
};
