'use strict';

const LIST = require('../helpers/list.js');
const CHARACTER = require('../helpers/character.js');
const MOVE = require('../helpers/move.js');
const STATUS = require('../helpers/status.js');

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
		if (list[0] == '') {
			mes += "データが未実装です。運営にお問い合わせください。";
		} else {
			mes += `${character}の技一覧\n\n◾️通常技\n${list[0]}\n\n◾️必殺技・特殊技\n${list[1]}\n\n「${character} 技名」で性能を検索できます。`;
		}
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
