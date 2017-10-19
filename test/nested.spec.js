const test = require('ava').test;
const stripAnsi = require('strip-ansi');
const render = require('../lib/render');

test('Sub tasks', t => {
	const tasks = [
		{
			title: 'Task 1',
			subtasks: [
				{
					title: 'Task 1A',
					subtasks: [],
					isEnabled: () => true,
					isCompleted: () => false,
					isPending: () => true,
					isSkipped: () => false,
					hasFailed: () => false
				}
			],
			isEnabled: () => true,
			isCompleted: () => false,
			isPending: () => true,
			isSkipped: () => false,
			hasFailed: () => false
		},
		{
			title: 'Task 2',
			subtasks: [],
			isEnabled: () => true,
			isCompleted: () => false,
			isPending: () => false,
			isSkipped: () => false,
			hasFailed: () => false
		}
	];
	const output = render(tasks, {});
	const expected = stripAnsi(output).split('\n');
	t.deepEqual(expected, [
		' ❯ Task 1',
		'   ⠙ Task 1A',
		'   Task 2'
	]);
});
