require('dotenv').config()
const { request, run } = require('./utils');

const port = process.env.PORT || 4000;
const external_endpoint = process.env.EXT_ENDPOINT;

var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send('Hello');
});

app.get('/raw_data', async (req, res) => {
	const data = await request(external_endpoint);
	res.send(data);
});

app.listen(port, function() {
	console.log(`Server listening on port ${port}`);
});

