const prerender = require('vue-egret/libs/prerender')

module.exports = function(content) {
    this.cacheable && this.cacheable();
    const template = content.replace(/(>)[\s]*|[\s]*(<)/g, '$1$2')
    return `module.exports = ${prerender(template)}`
}

