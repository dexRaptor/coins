var crypto = require('crypto');
var request = require('request');

var apiKey = '';
var apiSecret = '';
var apiPassphrase = '';

var timestamp = Date.now() / 1000;
var req = {
    method: 'GET',
    path: '/accounts', 
	//path: '/orders',
	//path: '/fills',
	//path: '/payment-methods', //-> FORBIDDEN FOR THIS APIKEY
    body: ''
};

var message = timestamp + req.method + req.path + req.body;
var key = Buffer(apiSecret, 'base64');
//var hmac = crypto.createHmac('sha256', key);
//var signature = hmac.update(message).digest('base64');
var signature = crypto.createHmac('sha256', key).update(message).digest('base64');

var options = {
    baseUrl: 'https://api.gdax.com/',
    url: req.path,
    method: req.method,
    headers: {
        'CB-ACCESS-SIGN':		signature,		
        'CB-ACCESS-TIMESTAMP': 	timestamp,
		'CB-ACCESS-KEY': 		apiKey,
        'CB-ACCESS-PASSPHRASE': apiPassphrase,
        'USER-AGENT': 			'my-app-client'        
    }
};

request(options,function(err, response){
    if (err) console.log(err);
    console.log(response.body);
});




