require('dcp-client').initSync();
const compute = require('dcp/compute');


async function centroid(records) {
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

module.exports = {
	centroid
}
