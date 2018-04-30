#!/usr/bin/env node
const { build } = require('biiif');
const { exec } = require('child_process');
const { join } = require('path');
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

	if (program.scaffoldFiles) {
		console.log('scaffolding files');

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
 
		ncp.limit = 16;

		const scaffoldTarget = './';		
		const scaffoldFilesPath = join(__dirname, 'scaffold');
		
		ncp(scaffoldFilesPath, scaffoldTarget, {
			clobber: false
		},
		function (err) {
			if (err) {
				return console.error(err);
			}

			let url = program.url;

			if (url.endsWith('/')) {
				url = url.substr(0, url.lastIndexOf('/'));
			}

			const explorerurl = url.substr(0, url.lastIndexOf('/'));
			const manifesturl = url + '/index.json';

			// replace [url]
			replaceInFile(join(scaffoldTarget, 'README.md'), /\[url\]/g, explorerurl);
			replaceInFile(join(scaffoldTarget, 'index.html'), /\[url\]/g, manifesturl);

			console.log('finished scaffolding');
		});
	}

	build(dir, program.url);
}

function replaceInFile(file, replacetarget, replacewith) {
	fs.readFile(file, 'utf8', function (err,data) {
		if (err) {
		    return console.log(err);
		}

		const result = data.replace(replacetarget, replacewith);
	  
		fs.writeFile(file, result, 'utf8', function (err) {
		   if (err) {
			   return console.log(err);
		   }
		});
	});
}