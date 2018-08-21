# fs-simple-cache

[![npm version](https://badge.fury.io/js/fs-simple-cache.svg)](https://badge.fury.io/js/fs-simple-cache)

Simple filesystem cache for node.

## Usage

```bash
npm install fs-simple-cache --save-dev
```

```js
const path = require('path')
const Cache = require('fs-simple-cache')
const cache = new Cache({
  cacheDirectory: path.resolve('.cache') // => optional, when not provided will use a temporary folder
})

let key = 'some content'
let content

// using json and gzip
if (!content = cache.get(key).content) {
  content = 'do some intensive stuff to create the content'
  cache.put(key, { content })
}

// using raw data and without gzip
const gzip = false
if (!content = cache.get(key, gzip)) {
  content = 'do some intensive stuff to create the content'
  cache.put(key, content, gzip)
}

// do something with the content

// delete the content
cache.delete(key, gzip)

// delete cache directory
cache.delete()
```