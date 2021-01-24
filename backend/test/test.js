const { request, centroid } = require('../utils');


const url = 'https://opendatakingston.cityofkingston.ca/api/records/1.0/search/?dataset=kfr-incidents&q=&rows=9999&refine.call_type=Fire';

const test = async function() {
	const data = await request(url);
	const results = await centroid(data.records);
	console.log(results);
}

test();
