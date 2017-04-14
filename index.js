const path = require('path')
const fs = require('fs')
const os = require('os')
const zlib = require('zlib')
const crypto = require('crypto')
const mkdirp = require('mkdirp')
const merge  = require('lodash.merge')

class Cache {
  constructor (options = {}) {
    this.options = merge({
      cacheDirectory: os.tmpdir()
    }, options)

    if (!fs.existsSync(this.options.cacheDirectory)){
      mkdirp.sync(this.options.cacheDirectory)
    }
  }

  get (source) {
    return this.readFile(this.getPath(source))
  }

  put (source, content) {
    this.saveFile(this.getPath(source), content)
  }

  getPath (source) {
    return path.join(this.options.cacheDirectory, this.getFile(source))
  }

  getFile (source) {
    const hash = crypto.createHash('SHA1')
    hash.update(source)
    return hash.digest('hex')+'.gzip'
  }

  readFile (filename) {
    let result = {}, content, data
    if (fs.existsSync(filename)) {
      content = fs.readFileSync(filename) || ''
      if (content) {
        data = zlib.gunzipSync(content)
        result = JSON.parse(data)
      }
    }
    return result
  }

  saveFile (filename, content) {
    const data = zlib.gzipSync(JSON.stringify(content))
    fs.writeFile(filename, data)
  }
}

module.exports = Cache