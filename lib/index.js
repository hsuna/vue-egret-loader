const path = require('path')
const normalize = require('./utils/normalize')
const tryRequire = require('./utils/try-require')
const selectorPath = normalize.lib('./compiler/selector')
const templatePath = normalize.lib('./compiler/template')
const prerenderPath = normalize.lib('./compiler/prerender')


// check whether default js loader exists
const hasBabel = !!tryRequire('babel-loader')
const loaderUtils = require('loader-utils')

module.exports = function() {
    const options = loaderUtils.getOptions(this) || {}
    const filePath = this.resourcePath
    const shortFilePath = path.relative(this.context, filePath).replace(/\\/g, '/')
    const shortSelectorPath = path.relative(this.context, selectorPath).replace(/\\/g, '/')
    const shortTemplatePath = path.relative(this.context, templatePath).replace(/\\/g, '/')
    const shortPrerenderPath = path.relative(this.context, prerenderPath).replace(/\\/g, '/')
    const scriptLoader = hasBabel ? 'babel-loader!' : ''
    
    return `
        /* script */
        import __vue_script__ from "!!${scriptLoader}./${shortSelectorPath}?type=script&index=0&bustCache!./${shortFilePath}"
        /* prerender */
        import __vue_prerender__ from "!!./${shortPrerenderPath}!./${shortSelectorPath}?type=template&index=0&bustCache!./${shortFilePath}"
        export * from "!!${scriptLoader}./${shortSelectorPath}?type=script&index=0&bustCache!./${shortFilePath}"
        export default {
            ...__vue_script__,
            render: __vue_prerender__,
        }
    `
}

// module.exports.raw = true;