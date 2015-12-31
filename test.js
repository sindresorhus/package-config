import path from 'path';
import test from 'ava';
import fn from './';

const cwd = path.join(__dirname, 'fixture');
const pkgPath = path.join(__dirname, 'package.json');

test('async', async t => {
	const x = await fn('fixture', cwd);
	t.true(x.foo);
	t.is(fn.filepath(x), pkgPath);
});

test('async - non-existent namespace', async t => {
	const x = await fn('unicorn', cwd);
	t.is(typeof x, 'object');
});

test('sync', t => {
	const x = fn.sync('fixture', cwd);
	t.true(x.foo);
	t.is(fn.filepath(x), pkgPath);
});

test('sync - non-existent namespace', t => {
	const x = fn.sync('unicorn', cwd);
	t.is(typeof x, 'object');
});
