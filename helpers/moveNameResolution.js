exports.resolveName = function(req) {
	// TODO: 半角カタカナ

    // 通常技解析
    let result = '';

    // 垂直/斜めJ
    if (req.search(/垂直|上|↑|8/) >= 0) {
        result += '垂直J';
    } else if (req.search(/J|ジャンプ|斜めJ|斜めジャンプ|前J|前ジャンプ|後ろジャンプ|後ろJ|バックジャンプ|バックJ/) >= 0) {
        result += '斜めJ';
    }

	// 立/屈
    if (req.search(/屈|こ|コ|下|↓|しゃがみ|2|くつ|足/) >= 0) {
        result += '屈';
    }

    // 前/後/近/遠
    if (req.search(/近|きん/) >= 0) {
        result += '近';
    } else if (req.search(/遠|えん/) >= 0) {
        result += '遠';
    } else if (req.search(/前|まえ|6|→/) >= 0) {
        result += '前';
    } else if (req.search(/後|うしろ|後ろ|4|←/) >= 0) {
        result += '後';
    }

    // 弱/中/強
    if (req.search(/弱|コ|こ|小/) >= 0) {
        result += '弱';
    } else if (req.search(/中/) >= 0) {
        result += '中';
    } else if (req.search(/強|大/) >= 0) {
        result += '強';
    }

    // P/K
    if (req.search(/P|p|パンチ|パ/) >= 0) {
        result += 'P';
    } else if (req.search(/K|k|キック|ア|足|あし/) >= 0) {
        result += 'K';
    } 
    
    return result;
}