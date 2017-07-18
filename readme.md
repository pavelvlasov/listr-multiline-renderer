# listr-multiline-renderer
> Same as `listr-multiline-renderer` but allows multiple lines Edit

Checkout the original [`listr-update-renderer`](https://github.com/SamVerschueren/listr-update-renderer) for more informations

## Install

```
$ npm install --save listr-multiline-renderer
```

## Usage

```js
const ListrMultilineRenderer = require('listr-multiline-renderer');
const Listr = require('listr');

const list = new Listr([/* tasks */], {
	renderer: ListrMultilineRenderer
});
```
