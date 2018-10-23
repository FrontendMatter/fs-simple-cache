const path = require('path')
const fs = require('fs')
const os = require('os')
const zlib = require('zlib')
const crypto = require('crypto')
const mkdirp = require('mkdirp')
const merge  = require('lodash.merge')
const del = require('del')

class Cache {
  constructor (options = {}) {
    this.options = merge({
      cacheDirectory: os.tmpdir()
    }, options)

    if (!fs.existsSync(this.options.cacheDirectory)){
      mkdirp.sync(this.options.cacheDirectory)
    }
  }

  get (source, gzip = true) {
    return this.readFile(this.getPath(source, gzip), gzip)
  }

  put (source, content, gzip = true) {
    this.saveFile(this.getPath(source, gzip), content, gzip)
  }

  delete (source = null, gzip = true) {
    if (source) {
      return del.sync(this.getPath(source, gzip))
    }
    del.sync(this.cacheDirectory)
  }

  getPath (source, gzip = true) {
    return path.join(this.options.cacheDirectory, this.getFile(source, gzip))
  }

  getFile (source, gzip = true) {
    const hash = crypto.createHash('SHA1')
    hash.update(source)
    return hash.digest('hex') + (gzip ? '.gzip' : '')
  }

  readFile (filename, gzip = true) {
    let result = {}
    let content = ''
    if (fs.existsSync(filename)) {
      content = fs.readFileSync(filename)
      if (content && gzip) {
        result = JSON.parse(zlib.gunzipSync(content))
      }
    }
    return gzip ? result : (content || '')
  }

  saveFile (filename, content, gzip = true) {
    let data = content
    if (gzip) {
      data = zlib.gzipSync(JSON.stringify(content))
    }
    fs.writeFileSync(filename, data)
  }
}

module.exports = Cache