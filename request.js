const axios = require('axios');

const options = {
	url: 'https://opendatakingston.cityofkingston.ca/api/records/1.0/search/?dataset=road-segments&q=&facet=street_type_suffix&facet=no_of_lane&facet=gis_class&facet=jurisdiction&facet=right_side_parity&facet=traffic_flow&facet=status&facet=road_level',
	method: 'get',
	headers: {'Content-Type': 'application/json'}
}

const request = async () => {
	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (err) {
		console.log(err);
	}
};

request();
