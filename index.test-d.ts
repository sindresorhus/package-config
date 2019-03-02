import {expectType} from 'tsd-check';
import pkgConf, {Config, sync, filepath} from '.';

pkgConf('name', {cwd: '.'});
pkgConf('name', {skipOnFalse: true});

expectType<Promise<Config>>(pkgConf('name'));
expectType<Promise<{foo: string; [key: string]: unknown}>>(
	pkgConf('name', {defaults: {foo: 'bar'}})
);

expectType<Config>(sync('bugs'));
expectType<{foo: string; [key: string]: unknown}>(
	sync('bugs', {defaults: {foo: 'bar'}})
);

const config = sync('bugs', {defaults: {foo: 'bar'}});
expectType<string | null>(filepath(config));
