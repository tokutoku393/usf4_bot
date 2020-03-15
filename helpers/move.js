'use strict';

const commonData = require("../src/commonList.js");
const commonList = commonData.commonList;

const skillData = require("../src/skillList.js");
const skillList = skillData.skillList;

const moveData = require("../src/moveList.js");
const moveList = moveData.moveList;

const moveNameResolve = require("../helpers/moveNameResolution.js");

// TODO: 半角・全角・ひらがな・カタカナ
exports.getMove = function(chara, req) {
	let result = "";

	// 共通技（投げ、セビ、スパコン、ウルコン）
	if (!commonList[req]) {
		for (const key in commonList) {
			if (commonList[key].indexOf(req) >= 0) {
				result += key;
			}
		}
	} else {
		result += req;
	}

	// 必殺技
	if (!result) {
		const skill = searchSkill(chara, req);
		if (skill !== undefined) {
			result += skill;
		}
	}

	// 通常技
	if (!result) {
		const searchWord = moveNameResolve.resolveName(req);
		if(searchMove(chara, searchWord) !== undefined) {
			result += searchWord;
		}
	}

	return result;
}

const searchSkill = function(chara, req) {
	let result = "";
	if (!skillList[chara][req]) {
		for (const key in skillList[chara]) {
			if (skillList[chara][key].indexOf(req) >= 0) {
				result += key;
			}
		}
	} else {
		result += req;
	}

	return result;
}

const searchMove = function(chara, req) {
	const result = moveList[chara].find(move => {
      	return move === req;
	});
	
	return result;
}

