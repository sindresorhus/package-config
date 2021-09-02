import {fileURLToPath} from 'node:url';
import path from 'node:path';
import test from 'ava';
import {packageConfig, packageConfigSync, packageJsonPath} from './index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const cwd = path.join(__dirname, 'fixture');
const nestedCwd = path.join(cwd, 'nested');
const pkgPath = path.join(__dirname, 'package.json');
const nestedPath = path.join(nestedCwd, 'package.json');

test('async', async t => {
	const config = await packageConfig('fixture', {cwd});
	t.true(config.foo);
	t.is(packageJsonPath(config), pkgPath);
});

test('async - non-existent namespace', async t => {
	const config = await packageConfig('noop', {cwd});
	t.is(typeof config, 'object');
});

test('sync', t => {
	const config = packageConfigSync('fixture', {cwd});
	t.true(config.foo);
	t.is(packageJsonPath(config), pkgPath);
});

test('sync - non-existent namespace', t => {
	const config = packageConfigSync('noop', {cwd});
	t.is(typeof config, 'object');
});

test('defaults option', t => {
	const config = packageConfigSync('fixture', {cwd, defaults: {bar: false}});
	t.true(config.foo);
	t.false(config.bar);

	const config2 = packageConfigSync('noop', {defaults: {unicorn: true}});
	t.true(config2.unicorn);
});

test('async - nested default', async t => {
	const config = await packageConfig('fixture', {
		cwd: nestedCwd,
		defaults: {cat: true},
	});

	t.true(config.cat);
	t.is(packageJsonPath(config), nestedPath);
});

test('async - nested skipOnFalse', async t => {
	const config = await packageConfig('fixture', {
		cwd: nestedCwd,
		skipOnFalse: true,
	});

	t.true(config.foo);
	t.is(packageJsonPath(config), pkgPath);
});

test('async - normal skipOnFalse', async t => {
	const config = await packageConfig('fixture', {
		cwd,
		skipOnFalse: true,
	});

	t.true(config.foo);
	t.is(packageJsonPath(config), pkgPath);
});

test('sync - nested default', t => {
	const config = packageConfigSync('fixture', {
		cwd: nestedCwd,
		defaults: {cat: true},
	});

	t.true(config.cat);
	t.is(packageJsonPath(config), nestedPath);
});

test('sync - nested skipOnFalse', t => {
	const config = packageConfigSync('fixture', {
		cwd: nestedCwd,
		skipOnFalse: true,
	});

	t.true(config.foo);
	t.is(packageJsonPath(config), pkgPath);
});

test('sync - normal skipOnFalse', t => {
	const config = packageConfigSync('fixture', {
		cwd,
		skipOnFalse: true,
	});

	t.true(config.foo);
	t.is(packageJsonPath(config), pkgPath);
});
