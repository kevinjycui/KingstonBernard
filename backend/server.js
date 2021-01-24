require('dotenv').config()
const { request, get_kfr_coords, centroid, nearest_road, furthest_road } = require('./utils');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

const port = process.env.PORT || 4000;
const external_endpoint_kfr = process.env.EXT_ENDPOINT_KFR;
const external_endpoint_roads = process.env.EXT_ENDPOINT_ROADS;

var express = require('express');

var app = express();

app.use(cors());
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.send('Hello');
});

app.get('/raw_data', async (req, res) => {
	const { type } = req.body;
	const data = await request(external_endpoint_kfr + type);
	res.send(data);
});

app.get('/data', async (req, res) => {
	const { number, type } = req.body;
	if (number == null || type == null)
		res.send('Please add a number and a type');

	var kfr_coords = await get_kfr_coords((await request(external_endpoint_kfr + type)).records);

	const centroid_coord = await centroid(kfr_coords);

	const data = await request(external_endpoint_roads);
	var road_array = [];
	data.records.forEach((record) => {
		road_array.push([record.geometry.coordinates[1], record.geometry.coordinates[0]]);
	});

	var kpoints = [await nearest_road(centroid_coord, road_array)];

	for (var j=0; j<number-1; j++)
		kpoints.push(
			await nearest_road(await furthest_road(kpoints, kfr_coords), road_array)
		);
	
	res.send(kpoints);
})

app.listen(port, function() {
	console.log(`Server listening on port ${port}`);
});

