const euclidean_distance = function(coord_1, coord_2) {
	return Math.sqrt((coord_1[0] - coord2[0]) ** 2 + (coord_1[1] - coord_2[1]) ** 2)
}

module.exports = {
	euclidean_distance
}
