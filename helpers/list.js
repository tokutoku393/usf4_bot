'use strict';

const skillData = require("../src/skillList.js");
const skillList = skillData.skillList;

const moveData = require("../src/moveList.js");
const moveList = moveData.moveList;

exports.getList = function (character) {
	let list1 = '';

	if (moveList[character] !== 0) {
		for (let i = 0, len = moveList[character].length; i < len; i++) {
			if (i == len-1) {
				list1 += `${moveList[character][i] } \n\n`;
			} else {
				list1 += `${moveList[character][i]}、`;
			}
		}
	}

	let list2 = '';
	if (skillList[character] !== 0) {
		for (const key in skillList[character]) {
			if (key == Object.keys(skillList[character]).pop()) {
				list2 += key;
			} else {
				list2 += `${key}、`;
			}
    	}
	}

	return [list1, list2];
}