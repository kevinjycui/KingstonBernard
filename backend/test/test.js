require('dotenv').config()
const { request, centroid } = require('../utils');

const external_endpoint = process.env.EXT_ENDPOINT;

const test = async function() {
	const data = await request(external_endpoint);
	const results = await centroid(data.records);
	console.log(results);
}

test();
