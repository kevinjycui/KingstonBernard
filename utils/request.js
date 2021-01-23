const axios = require('axios');

const request = async (url) => {
	const options = {
		url: url,
		method: 'get',
        	headers: {'Content-Type': 'application/json'}
	};

	try {
		const response = await axios.request(options);
		console.log(response.data);
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	request: request
};
