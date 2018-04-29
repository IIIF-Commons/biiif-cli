#!/usr/bin/env node
const { build } = require('biiif');
const { exec } = require('child_process');
const fs = require('fs');
const ncp = require('ncp').ncp;
const program = require('commander');
const withErrors = require('./withErrors');

program.arguments('<dir>')
	.option('-u, --url <url>', 'The url to use as the base of all ids')
	.option('-s, --scaffold-files', 'Scaffold files for github pages, netlify')
	.action(withErrors(execCli))
	.parse(process.argv);

async function execCli(env, options) { 

	const dir = program.args[0];

	if (program.generateFiles) {
		console.log('scaffolding files');

		if (!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}
 
		ncp.limit = 16;
		
		ncp(source, destination, function (err) {
			if (err) {
				return console.error(err);
			}
			console.log('finished scaffolding');
		});
		//await exec('mkdir collection');
	}

	build(dir, program.url);
}