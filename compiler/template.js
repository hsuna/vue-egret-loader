const loaderUtils = require('loader-utils')

module.exports = function(content) {
    this.cacheable && this.cacheable();
    return `module.exports = ${JSON.stringify(content.replace(/(>)[\s]*|[\s]*(<)/g, '$1$2'))}`
}