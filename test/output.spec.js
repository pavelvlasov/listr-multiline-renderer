const test = require('ava').test;
const stripAnsi = require('strip-ansi');
const render = require('../lib/render');

test('Single-line output', t => {
	const tasks = [
		{
			title: 'Task 1',
			subtasks: [],
			output: 'Hello',
			isEnabled: () => true,
			isCompleted: () => false,
			isPending: () => true,
			isSkipped: () => false,
			hasFailed: () => false
		}
	];
	const output = render(tasks, {});
	const expected = stripAnsi(output).split('\n');
	t.deepEqual(expected, [
		' ⠙ Task 1',
		'   → Hello'
	]);
});

test('Multi-line output', t => {
	const tasks = [
		{
			title: 'Task 1',
			subtasks: [],
			output: 'Hello\nWorld',
			isEnabled: () => true,
			isCompleted: () => false,
			isPending: () => true,
			isSkipped: () => false,
			hasFailed: () => false
		}
	];
	const output = render(tasks, {});
	const expected = stripAnsi(output).split('\n');
	t.deepEqual(expected, [
		' ⠙ Task 1',
		'   → Hello',
		'     World'
	]);
});

test('Nested with output', t => {
	const tasks = [
		{
			title: 'Task 1',
			subtasks: [
				{
					title: 'Task 1A',
					subtasks: [],
					output: 'Hello',
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
		}
	];
	const output = render(tasks, {});
	const expected = stripAnsi(output).split('\n');
	t.deepEqual(expected, [
		' ❯ Task 1',
		'   ⠙ Task 1A',
		'     → Hello'
	]);
});
