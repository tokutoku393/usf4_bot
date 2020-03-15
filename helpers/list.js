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

	list += '◾️通常技\n'
	for (let i = 0, len = moveList[character].length; i < len; i++) {
		if (i == len-1) {
			list += `${moveList[character][i] } \n\n`;
		} else {
			list += `${moveList[character][i]}、`;
		}
	}

	list += '◾️必殺技・特殊技\n';
	for (const key in skillList[character]) {
		list += `${key}、`;
	}

	if (list !== '') {
		for (const key in commonList) {
			if (key == Object.keys(commonList).pop()) {
				list += key;
			} else {
				list += `${key}、`;
			}
		}
	}
	return list;
}