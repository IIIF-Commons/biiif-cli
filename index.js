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

	if (program.scaffoldFiles) {
		console.log('scaffolding files');

		if (!fs.existsSync(dir)) {
			fs.mkdirSync(dir);
		}
 
		ncp.limit = 16;

		const scaffoldTarget = './scaffoldtest';
		
		ncp('./scaffold', scaffoldTarget, function (err) {
			if (err) {
				return console.error(err);
			}

			// replace [url]
			await replaceInFile('./README.md', /[url]/g, program.url);
			await replaceInFile('./index.html', /[url]/g, program.url);

			console.log('finished scaffolding');
		});
	}

	build(dir, program.url);
}

async function replaceInFile(file, replacetarget, replacewith) {
	return fs.readFile(file, 'utf8', function (err,data) {
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