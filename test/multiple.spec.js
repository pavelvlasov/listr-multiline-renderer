const test = require('ava').test;
const stripAnsi = require('strip-ansi');
const render = require('../lib/render');

test('First in progress', t => {
	const tasks = [
		{
			title: 'Task 1',
			subtasks: [],
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
		' ⠙ Task 1',
		'   Task 2'
	]);
});

test('First skipped', t => {
	const tasks = [
		{
			title: 'Task 1',
			subtasks: [],
			isEnabled: () => true,
			isCompleted: () => false,
			isPending: () => false,
			isSkipped: () => true,
			hasFailed: () => false
		},
		{
			title: 'Task 2',
			subtasks: [],
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
		' ↓ Task 1 [skipped]',
		' ⠙ Task 2'
	]);
});

test('Second in progress', t => {
	const tasks = [
		{
			title: 'Task 1',
			subtasks: [],
			isEnabled: () => true,
			isCompleted: () => true,
			isPending: () => false,
			isSkipped: () => false,
			hasFailed: () => false
		},
		{
			title: 'Task 2',
			subtasks: [],
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
		' ✔ Task 1',
		' ⠙ Task 2'
	]);
});

test('Skips disabled tasks', t => {
	const tasks = [
		{
			title: 'Task 1',
			subtasks: [],
			isEnabled: () => false,
			isCompleted: () => false,
			isPending: () => false,
			isSkipped: () => false,
			hasFailed: () => false
		},
		{
			title: 'Task 2',
			subtasks: [],
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
		' ⠙ Task 2'
	]);
});
