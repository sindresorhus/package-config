import {expectType, expectAssignable} from 'tsd';
import {packageConfig, packageConfigSync, packageJsonPath, Config} from './index.js';

await packageConfig('name', {cwd: '.'});
await packageConfig('name', {skipOnFalse: true});

expectType<Promise<Config>>(packageConfig('name'));
expectAssignable<Promise<{[key: string]: unknown; foo: string}>>(
	packageConfig('name', {defaults: {foo: 'bar'}}),
);

expectType<Config>(packageConfigSync('bugs'));
expectAssignable<{[key: string]: unknown; foo: string}>(
	packageConfigSync('bugs', {defaults: {foo: 'bar'}}),
);

const config = packageConfigSync('bugs', {defaults: {foo: 'bar'}});
expectType<string | undefined>(packageJsonPath(config));
