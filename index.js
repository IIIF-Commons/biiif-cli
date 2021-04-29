#!/usr/bin/env node
const { build } = require('biiif');
const program = require('commander');
const withErrors = require('./withErrors');

program.arguments('<dir>')
	.option('-u, --url <url>', 'The url to use as the base of all ids')
	.option('-v, --virtual-name <virtual-name>', 'Use this virtual name for the root directory instead of its actual one when generating urls')
	.action(withErrors(execCli))
	.parse(process.argv);

async function execCli(env, options) { 
	const dir = program.args[0];
	await build(dir, program.url, program.virtualName);
	console.log('biiif-cli exit');
}