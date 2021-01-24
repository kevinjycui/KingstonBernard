require('dcp-client').initSync();
const compute = require('dcp/compute');


async function check(records) {
			if (records.length === 0) {
                                return [0, 0];
                        }

                        var x = 0;
                        var y = 0;

                        for (var i=0; i<records.length; i++)  {
                                var record = records[i].fields;
                                if ('geo_point_2d' in record) {
                                        x += record.geo_point_2d[0];
                                        y += record.geo_point_2d[1];
                                }
                        }

                        x /= records.length;
                        y /= records.length;

                        return [x, y];
}

async function centroid(records) {

	console.log(await check(records));

	try {

		const job = compute.do(function(records) {
		
			if (records.length === 0) {
				return [0, 0];
			}

			var x = 0;
			var y = 0;
			
			progress('10%');
			
			for (var i=0; i<records.length; i++)  {
				var record = records[i].fields;
				if ('geo_point_2d' in record) {
					x += record.geo_point_2d[0];
					y += record.geo_point_2d[1];
				}
			}

			progress('90%');

			x /= records.length;
			y /= records.length;
		
			return [x, y];

		}, [records]);

		job.on('accepted', () => console.log('Job accepted', job.id));
		job.on('complete', () => console.log('Job complete'));

		let results = await job.exec();

		return results.values();

	} catch (err) {
		console.log(err);
		return [0, 0];
	}
}

module.exports = {
	centroid
}
