'use strict';

require("dotenv").config();

const LIST = require(process.env.DIR + 'helpers/list.js');
const CHARACTER = require(process.env.DIR + 'helpers/character.js');
const MOVE = require(process.env.DIR + 'helpers/move.js');
const STATUS = require(process.env.DIR + 'helpers/status.js');

exports.getData = function(req) {
	let mes = '';
	const req_arr = req.split(/\s/);

	// ヘルプ
	if (req_arr[0] == 'ヘルプ') {
		mes += `「キャラ名 技名」で性能検索ができます。\n技名がわからない時は「キャラ名 一覧」で技一覧を参照できます。`
	}

	// キャラクター名を取得
	let character = '';
	if (!mes) {
		character = CHARACTER.getCharacter(req_arr[0]);
		if (!character) {
        	mes += "キャラクター名が見つかりませんでした。";
		}
	}

	// 一覧
	if (character !== '' && req_arr[1] == '一覧') {
		const list = LIST.getList(character);
		mes += `${character}の技一覧\n\n${list}\n\n「${character} 技名」で性能を検索できます。`;
	}

	// 技名を取得
	let move = '';
	if (mes == '' && character !== '') {
		move = MOVE.getMove(character, req_arr[1]);
		if (character !== undefined && !move) {
			mes += `技名が見つかりませんでした。キャラの技一覧は「${character} 一覧」で調べることができます。\n\n`;
		}
	}

	// 対応するステータスを取得
	let status = '';
	if (character !== '' && move !== '') {
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
