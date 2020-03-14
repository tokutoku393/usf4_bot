'use strict';

require("dotenv").config();

const statusData = require(process.env.DIR + "src/statusList.js");
const statusList = statusData.statusList;

exports.getStatus = function(character, move) {
	return statusList[character][move];
}