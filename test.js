import path from 'path';
import test from 'ava';
import m from '.';

const cwd = path.join(__dirname, 'fixture');
const nestedCwd = path.join(cwd, 'nested');
const pkgPath = path.join(__dirname, 'package.json');
const nestedPath = path.join(nestedCwd, 'package.json');

test('async', async t => {
	const x = await m('fixture', {cwd});
	t.true(x.foo);
	t.is(m.filepath(x), pkgPath);
});

test('async - non-existent namespace', async t => {
	const x = await m('noop', {cwd});
	t.is(typeof x, 'object');
});

test('sync', t => {
	const x = m.sync('fixture', {cwd});
	t.true(x.foo);
	t.is(m.filepath(x), pkgPath);
});

test('sync - non-existent namespace', t => {
	const x = m.sync('noop', {cwd});
	t.is(typeof x, 'object');
});

test('defaults option', t => {
	const x = m.sync('fixture', {cwd, defaults: {bar: false}});
	t.true(x.foo);
	t.false(x.bar);

	const x2 = m.sync('noop', {defaults: {unicorn: true}});
	t.true(x2.unicorn);
});

test('async - nested default', async t => {
	const x = await m('fixture', {
		cwd: nestedCwd,
		defaults: {cat: true}
	});

	t.true(x.cat);
	t.is(m.filepath(x), nestedPath);
});

test('async - nested skipOnFalse', async t => {
	const x = await m('fixture', {
		cwd: nestedCwd,
		skipOnFalse: true
	});

	t.true(x.foo);
	t.is(m.filepath(x), pkgPath);
});

test('async - normal skipOnFalse', async t => {
	const x = await m('fixture', {
		cwd,
		skipOnFalse: true
	});

	t.true(x.foo);
	t.is(m.filepath(x), pkgPath);
});

test('sync - nested default', t => {
	const x = m.sync('fixture', {
		cwd: nestedCwd,
		defaults: {cat: true}
	});

	t.true(x.cat);
	t.is(m.filepath(x), nestedPath);
});

test('sync - nested skipOnFalse', t => {
	const x = m.sync('fixture', {
		cwd: nestedCwd,
		skipOnFalse: true
	});

	t.true(x.foo);
	t.is(m.filepath(x), pkgPath);
});

test('sync - normal skipOnFalse', t => {
	const x = m.sync('fixture', {
		cwd,
		skipOnFalse: true
	});

	t.true(x.foo);
	t.is(m.filepath(x), pkgPath);
});
