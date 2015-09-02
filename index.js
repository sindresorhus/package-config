'use strict';
var findUp = require('find-up');
var readPkg = require('read-pkg');
var Symbol = require('symbol');
var fpSymbol = Symbol('package.json filepath');

function addFp(x, fp) {
	x[fpSymbol] = fp;
	return x;
}

module.exports = function (namespace, cwd) {
	return findUp('package.json', {cwd: cwd})
		.then(function (fp) {
			if (!namespace) {
				throw new TypeError('Expected a namespace');
			}

			if (!fp) {
				return addFp({}, fp);
			}

			return readPkg(fp, {normalize: false}).then(function (pkg) {
				return addFp(pkg[namespace] || {}, fp);
			}, function () {
				return addFp({}, fp);
			});
		});
};

module.exports.sync = function (namespace, cwd) {
	if (!namespace) {
		throw new TypeError('Expected a namespace');
	}

	var fp = findUp.sync('package.json', {cwd: cwd});

	if (!fp) {
		return addFp({}, fp);
	}

	var pkg;

	try {
		pkg = readPkg.sync(fp, {normalize: false});
	} catch (err) {
		return addFp({}, fp);
	}

	return addFp(pkg[namespace] || {}, fp);
};

module.exports.filepath = function (conf) {
	return conf[fpSymbol];
};
