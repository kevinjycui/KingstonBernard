require('dcp-client').initSync();
const compute = require('dcp/compute');


function euclidean_distance(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

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

	return [y, x];
}

async function nearest_road(coordinates, road_array) {
	var x = coordinates[0];
	var y = coordinates[1];

	var nearest_x = 0;
	var nearest_y = 0;

	var min_distance = 1 << 30;

	road_array.forEach((road) => {
		var distance = euclidean_distance(x, y, road[0], road[1]);
		if (distance < min_distance) {
			min_distance = distance;
			nearest_x = road[0];
			nearest_y = road[1];
		}
	});

	return [nearest_y, nearest_x];
}

async function furthest_road(coordinate_array, road_array) {

	var furthest_x = 0;
	var furthest_y = 0;

	var max_distance = 0;

	road_array.forEach((road) => {
		var distance = 999;
		coordinate_array.forEach((coordinate) => {
			distance = Math.min(distance, euclidean_distance(coordinate[0], coordinate[1], road[0], road[1]));
		});

		if (distance > max_distance) {
			max_distance = distance;
			furthest_x = road[0];
			furthest_y = road[1];
		}
	});

	return [furthest_y, furthest_x];
}


module.exports = {
	centroid,
	nearest_road,
	furthest_road
}
