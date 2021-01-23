require('dcp-client').initSync();
const compute = require('dcp/compute');

async function run() {
	const job = compute.for(1, 10, function(n) {
		const result = n+100;
		progress('50%');
		result = result * n;
		progress('100%');
		return result;
	});

	job.on('accepted', () => console.log('Job accepted', job.id));
	job.on('complete', () => console.log('Job complete'));

	const results = await job.exec();
	console.log(results);
}

run();
