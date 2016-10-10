import path from 'path';
import test from 'ava';
import m from './';

const cwd = path.join(__dirname, 'fixture');
const pkgPath = path.join(__dirname, 'package.json');

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
