const compiler = require('vue-template-compiler')
const LRU = require('lru-cache')
const hash = require('hash-sum')
const cache = new LRU(100)
const loaderUtils = require('loader-utils')

module.exports = function(content) {
    const query = loaderUtils.getOptions(this) || {}

    const cacheKey = hash(content.replace(/\\/g, '/'))
    let output = cache.get(cacheKey)
    if (output) return output[query.type] ? output[query.type].content : ''
    output = compiler.parseComponent(content)
    cache.set(cacheKey, output)
    return output[query.type] ? output[query.type].content : ''
}