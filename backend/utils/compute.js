require('dcp-client').initSync();
const compute = require('dcp/compute');
const { request } = require('./request');
const { euclidean_distance } = require('./measure');

const external_endpoint = 'https://opendatakingston.cityofkingston.ca/api/records/1.0/search/?dataset=trails&q=&facet=trailname&facet=activities&facet=trail_class&facet=accessible';

async function run(data) {

	try {

		const data = await request(external_endpoint).records;
	
		const job = compute.for(0, 100, function(n) {
			let result = n+100;
			progress('50%');
			result = result * n;
			progress('100%');
			return result;
		});

		job.on('accepted', () => console.log('Job accepted', job.id));
		job.on('complete', () => console.log('Job complete'));
	
		let results = await job.exec();
		console.log(results);

	} catch (err) {
		console.log(err);
		return {};
	}
}

module.exports = {
	run
};
