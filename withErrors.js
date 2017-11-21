const chalk = require('chalk');

// use to wrap a command to catch and display errors
const withErrors = (command) => {
	return async (...args) => {
		try {
			await command(...args)
		} catch (e) {
			console.log(chalk.red(e.stack));
			process.exitCode = 1;
		}
	}
}

module.exports = withErrors;