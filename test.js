'use strict';
var path = require('path');
var test = require('ava');
var fn = require('./');
var cwd = path.join(__dirname, 'fixture');
var pkgPath = path.join(__dirname, 'package.json');

test('async', function (t) {
	return fn('fixture', cwd).then(function (x) {
		t.true(x.foo);
		t.is(fn.filepath(x), pkgPath);
	});
});

test('async - non-existent namespace', function (t) {
	return fn('unicorn', cwd).then(function (x) {
		t.is(typeof x, 'object');
	});
});

test('sync', function (t) {
	var x = fn.sync('fixture', cwd);
	t.true(x.foo);
	t.is(fn.filepath(x), pkgPath);
	t.end();
});

test('sync - non-existent namespace', function (t) {
	var x = fn.sync('unicorn', cwd);
	t.is(typeof x, 'object');
	t.end();
});
