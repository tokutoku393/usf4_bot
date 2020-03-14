'use strict';

require("dotenv").config();

const CHARACTER = require(process.env.DIR + 'helpers/character.js');
const MOVE = require(process.env.DIR + 'helpers/move.js');
const STATUS = require(process.env.DIR + 'helpers/status.js');

exports.getData = function(req) {
	let mes = '';
	let character = '';
	let move = '';
	let status = '';

	// helpや一覧を取得

	// キャラクター名を取得
	character = CHARACTER.getCharacter(req[0]);
	if (!character) {
        mes += "キャラクター名が見つかりませんでした。";
	}

	// 技名を取得
	if (character !== '') {
		move = MOVE.getMove(character, req[1]);
		if (character !== undefined && !move) {
			mes += `技名が見つかりませんでした。キャラの技一覧は「${character} 技一覧」で調べることができます。\n\n`;
		}
	}

	// 対応するステータスを取得
	if (character !== '' && move !== '') {
		console.log(move);
		status = STATUS.getStatus(character, move);
		if (!status) {
			mes += "データが未実装です。運営にお問い合わせください。";
		} else {
			mes += `${character} ${move}\n\n`;
			for (const key in status) {
				mes += `${key}: ${status[key]}\n`;
			}
		}
	}

	return mes;
}