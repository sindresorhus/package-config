import path from 'path';
import test from 'ava';
import pkgConf from '.';

const cwd = path.join(__dirname, 'fixture');
const nestedCwd = path.join(cwd, 'nested');
const pkgPath = path.join(__dirname, 'package.json');
const nestedPath = path.join(nestedCwd, 'package.json');

test('async', async t => {
	const config = await pkgConf('fixture', {cwd});
	t.true(config.foo);
	t.is(pkgConf.filepath(config), pkgPath);
});

test('async - non-existent namespace', async t => {
	const config = await pkgConf('noop', {cwd});
	t.is(typeof config, 'object');
});

test('sync', t => {
	const config = pkgConf.sync('fixture', {cwd});
	t.true(config.foo);
	t.is(pkgConf.filepath(config), pkgPath);
});

test('sync - non-existent namespace', t => {
	const config = pkgConf.sync('noop', {cwd});
	t.is(typeof config, 'object');
});

test('defaults option', t => {
	const config = pkgConf.sync('fixture', {cwd, defaults: {bar: false}});
	t.true(config.foo);
	t.false(config.bar);

	const config2 = pkgConf.sync('noop', {defaults: {unicorn: true}});
	t.true(config2.unicorn);
});

test('async - nested default', async t => {
	const config = await pkgConf('fixture', {
		cwd: nestedCwd,
		defaults: {cat: true}
	});

	t.true(config.cat);
	t.is(pkgConf.filepath(config), nestedPath);
});

test('async - nested skipOnFalse', async t => {
	const config = await pkgConf('fixture', {
		cwd: nestedCwd,
		skipOnFalse: true
	});

	t.true(config.foo);
	t.is(pkgConf.filepath(config), pkgPath);
});

test('async - normal skipOnFalse', async t => {
	const config = await pkgConf('fixture', {
		cwd,
		skipOnFalse: true
	});

	t.true(config.foo);
	t.is(pkgConf.filepath(config), pkgPath);
});

test('sync - nested default', t => {
	const config = pkgConf.sync('fixture', {
		cwd: nestedCwd,
		defaults: {cat: true}
	});

	t.true(config.cat);
	t.is(pkgConf.filepath(config), nestedPath);
});

test('sync - nested skipOnFalse', t => {
	const config = pkgConf.sync('fixture', {
		cwd: nestedCwd,
		skipOnFalse: true
	});

	t.true(config.foo);
	t.is(pkgConf.filepath(config), pkgPath);
});

test('sync - normal skipOnFalse', t => {
	const config = pkgConf.sync('fixture', {
		cwd,
		skipOnFalse: true
	});

	t.true(config.foo);
	t.is(pkgConf.filepath(config), pkgPath);
});
