const axios = require('axios');

const options = {
	url: 'https://opendatakingston.cityofkingston.ca/api/records/1.0/search/?dataset=trails&q=&facet=trailname&facet=activities&facet=trail_class&facet=accessible',
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
