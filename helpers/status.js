'use strict';

const statusData = require("../src/statusList.js");
const statusList = statusData.statusList;

exports.getStatus = function(character, move) {
	return statusList[character][move];
}