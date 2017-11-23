#!/usr/bin/env node
const { build } = require('biiif');
const program = require('commander');
const withErrors = require('./withErrors');

program.arguments('<dir>')
	.option('-u, --url <url>', 'The url to use as the base of all ids')
	.action(withErrors(exec))
	.parse(process.argv);

async function exec(env, options) { 
	const dir = program.args[0];
	build(dir, program.url);
}