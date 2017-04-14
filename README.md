# fs-simple-cache

[![npm version](https://badge.fury.io/js/fs-simple-cache.svg)](https://badge.fury.io/js/fs-simple-cache)

Simple filesystem cache for node.

## Usage

```bash
npm install fs-simple-cache --save-dev
```

```js
const Cache = require('fs-simple-cache')
const cache = new Cache()

let key = 'some content'
let content
if (!content = cache.get('some content').content) {
  content = 'do some intensive stuff to create the content'
  cache.put(key, { content })
}

// do something with the content
```