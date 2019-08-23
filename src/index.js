function transformSchema(o) {
	return Object.entries(o).reduce((res, [key, value]) => {
		res[key] = typeof value !== 'object' ? typeof value : transformSchema(value);
		return res;
	}, Array.isArray(o) ? [] : {});
}

function handleArrInMyStringify(type) {
	return type || 'null';
}

function myStringify(json, space = 2, step = 2) {
	const ret = Object.keys(json).reduce((res, cur, index) => {
		const isObj = typeof json[cur] !== 'object';
		const isArr = Array.isArray(json[cur]);
		const prefix = `${index ? '\n' : ''}${' '.repeat(space)}${cur}: `;
		if (isArr) {
			return res + (
				`${prefix}${json[cur].reduce((curRes, curItem) => {
					return `${typeof curItem !== 'object' ?
						handleArrInMyStringify(curItem) :
						myStringify(curItem, space + step)
						}${curRes ? ' | ' : ''}${curRes}`;
				}, '')} [];`
			);
		}
		if (isArr && (typeof json[cur][0] !== 'object')) {
			return res + (
				`${prefix}${handleArrInMyStringify(json[cur][0])}[];`
			);
		}
		return res + (
			`${prefix}${isObj ?
				json[cur] : myStringify(isArr ? json[cur][0] : json[cur], space + step)}${isArr ? '[]' : ''};`
		);
	}, '');
	if (Array.isArray(json)) {
		return `${ret}[]`;
	}
	return `{
${ret}
${' '.repeat(space - 2)}}`;
}

function declarationGen(o) {
	return myStringify(transformSchema(o));
}

module.exports = declarationGen;
