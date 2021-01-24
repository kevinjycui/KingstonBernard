require('dotenv').config()
const { request, centroid } = require('../utils');

const external_endpoint = process.env.EXT_ENDPOINT_ROADS;

const test = async function() {
	const data = await request(external_endpoint);
	// const results = await centroid(data.records);
	data.records.forEach((record) => {
		console.log(record.geometry.coordinates)
	});
}

test();
