const { run } = require('../utils/compute');
const { request } = require('../utils/request');

const url = 'https://opendatakingston.cityofkingston.ca/api/records/1.0/search/?dataset=trails&q=&facet=trailname&facet=activities&facet=trail_class&facet=accessible';

run();
