'use strict';

require("dotenv").config();

const commonData = require(process.env.DIR + "src/commonList.js");
const commonList = commonData.commonList;

const skillData = require(process.env.DIR + "src/skillList.js");
const skillList = skillData.skillList;

const moveData = require(process.env.DIR + "src/moveList.js");
const moveList = moveData.moveList;

exports.getList = function (character) {
	let list = '';

	for (let i = 0, len = moveList[character].length; i < len; i++) {
		list += `${moveList[i]}\n`;
	}

	for (const key in skillList[character]) {
		list += `${key}\n`;
	}

	if (list !== '') {
		for (const key in commonList) {
			list += `${key}\n`;
		}
	}
	return list;
}