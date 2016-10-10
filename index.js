'use strict';
const path = require('path');
const findUp = require('find-up');
const loadJsonFile = require('load-json-file');

const filepaths = new WeakMap();
const filepath = conf => filepaths.get(conf);

function addFp(obj, fp) {
	filepaths.set(obj, fp);
	return obj;
}

function findNextCwd(pkgPath) {
	const dirName = path.dirname(pkgPath);
	return path.join(dirName, '..');
}

const pkgConf = (namespace, opts) => {
	if (!namespace) {
		return Promise.reject(new TypeError('Expected a namespace'));
	}

	opts = opts || {};

	return findUp('package.json', opts.cwd ? {cwd: opts.cwd} : {})
		.then(fp => {
			if (!fp) {
				return addFp(Object.assign({}, opts.defaults), fp);
			}

			return loadJsonFile(fp).then(pkg => {
				if (opts.skipOnFalse && pkg[namespace] === false) {
					const nextCwd = findNextCwd(fp);
					const newOpts = Object.assign({}, opts, {cwd: nextCwd});
					return pkgConf(namespace, newOpts);
				}

				return addFp(Object.assign({}, opts.defaults, pkg[namespace]), fp);
			});
		});
};

const sync = (namespace, opts) => {
	if (!namespace) {
		throw new TypeError('Expected a namespace');
	}

	opts = opts || {};

	const fp = findUp.sync('package.json', opts.cwd ? {cwd: opts.cwd} : {});

	if (!fp) {
		return addFp(Object.assign({}, opts.defaults), fp);
	}

	const pkg = loadJsonFile.sync(fp);
	if (opts.skipOnFalse && pkg[namespace] === false) {
		const nextCwd = findNextCwd(fp);
		const newOpts = Object.assign({}, opts, {cwd: nextCwd});
		return sync(namespace, newOpts);
	}

	return addFp(Object.assign({}, opts.defaults, pkg[namespace]), fp);
};

module.exports = pkgConf;
module.exports.filepath = filepath;
module.exports.sync = sync;
