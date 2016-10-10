'use strict';
const findUp = require('find-up');
const loadJsonFile = require('load-json-file');

const filepaths = new WeakMap();

function addFp(obj, fp) {
	filepaths.set(obj, fp);
	return obj;
}

module.exports = (namespace, opts) => {
	if (!namespace) {
		return Promise.reject(new TypeError('Expected a namespace'));
	}

	opts = opts || {};

	return findUp('package.json', opts.cwd ? {cwd: opts.cwd} : {})
		.then(fp => {
			if (!fp) {
				return addFp(Object.assign({}, opts.defaults), fp);
			}

			return loadJsonFile(fp).then(pkg =>
				addFp(Object.assign({}, opts.defaults, pkg[namespace]), fp));
		});
};

module.exports.sync = (namespace, opts) => {
	if (!namespace) {
		throw new TypeError('Expected a namespace');
	}

	opts = opts || {};

	const fp = findUp.sync('package.json', opts.cwd ? {cwd: opts.cwd} : {});

	if (!fp) {
		return addFp(Object.assign({}, opts.defaults), fp);
	}

	const pkg = loadJsonFile.sync(fp);

	return addFp(Object.assign({}, opts.defaults, pkg[namespace]), fp);
};

module.exports.filepath = conf => filepaths.get(conf);
