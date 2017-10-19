'use strict';
const chalk = require('chalk');
const figures = require('figures');
const indentString = require('indent-string');
const cliTruncate = require('cli-truncate');
const utils = require('./utils');

const render = (tasks, options, level) => {
	level = level || 0;
	let output = [];

	for (const task of tasks) {
		if (task.isEnabled()) {
			const skipped = task.isSkipped() ? ` ${chalk.dim('[skipped]')}` : '';
			// Output current task title
			output.push(indentString(` ${utils.getSymbol(task, options)} ${task.title}${skipped}`, level, '  '));
			// And its output
			if ((task.isPending() || task.isSkipped() || task.hasFailed()) && utils.isDefined(task.output)) {
				const data = task.output;
				if (typeof data === 'string') {
					data.split('\n').filter(Boolean).forEach((line, i) => {
						output.push(`   ${chalk.gray(cliTruncate(indentString(`${i === 0 ? figures.arrowRight : ' '} ${line}`, level, '  '), process.stdout.columns - 3))}`);
					});
				}
			}
			// And the subtasks, recursively
			if ((task.isPending() || task.hasFailed() || options.collapse === false) && (task.hasFailed() || options.showSubtasks !== false) && task.subtasks.length > 0) {
				output = output.concat(render(task.subtasks, options, level + 1));
			}
		}
	}

	return output.join('\n');
};

module.exports = render;
