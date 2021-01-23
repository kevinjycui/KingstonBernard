const { request, run } = require('./utils');

var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send('Hello');
});

app.get('/raw_data', async (req, res) => {
	const EXT_ENDPOINT = 'https://opendatakingston.cityofkingston.ca/api/records/1.0/search/?dataset=trails&q=&facet=trailname&facet=activities&facet=trail_class&facet=accessible';
	const data = await request(EXT_ENDPOINT);
	res.send(data);
});

app.listen(3000, function() {
	console.log('Server listening on port 3000');
});
