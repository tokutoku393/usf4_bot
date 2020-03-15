'use strict';

const data = require("../src/characterList.js");
const dataList = data.characterList;

exports.getCharacter = function(req) {
	let result = "";

	if (!dataList[req]) {
		for (const key in dataList) {
			if (dataList[key].indexOf(req) >= 0) {
				result += key;
			}
		}
	} else {
		result += req;
	}

  return result;
};
