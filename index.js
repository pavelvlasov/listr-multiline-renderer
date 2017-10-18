'use strict';
const logUpdate = require('log-update');
const render = require('./lib/render');

class UpdateRenderer {

	constructor(tasks, options) {
		this._tasks = tasks;
		this._options = Object.assign({
			showSubtasks: true,
			collapse: true
		}, options);
	}

	render() {
		if (this._id) {
			// Do not render if we are already rendering
			return;
		}

		this._id = setInterval(() => {
			logUpdate(render(this._tasks, this._options));
		}, 100);
	}

	end() {
		if (this._id) {
			clearInterval(this._id);
			this._id = undefined;
		}

		logUpdate(render(this._tasks, this._options));
		logUpdate.done();
	}
}

module.exports = UpdateRenderer;
