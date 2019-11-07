const path = require('path')
const normalize = require('./utils/normalize')
const tryRequire = require('./utils/try-require')
const selectorPath = normalize.lib('./compiler/selector')
const templatePath = normalize.lib('./compiler/template')

// check whether default js loader exists
const hasBabel = !!tryRequire('babel-loader')

module.exports = function() {
    const filePath = this.resourcePath
    const shortFilePath = path.relative(this.context, filePath).replace(/\\/g, '/')
    const shortSelectorPath = path.relative(this.context, selectorPath).replace(/\\/g, '/')
    const shortTemplatePath = path.relative(this.context, templatePath).replace(/\\/g, '/')
    const scriptLoader = hasBabel ? 'babel-loader!' : ''
    return `
        /* script */
        export * from "!!${scriptLoader}./${shortSelectorPath}?type=script&index=0&bustCache!./${shortFilePath}"
        import __vue_script__ from "!!${scriptLoader}./${shortSelectorPath}?type=script&index=0&bustCache!./${shortFilePath}"
        /* template */
        import __vue_template__ from "!!./${shortTemplatePath}!./${shortSelectorPath}?type=template&index=0&bustCache!./${shortFilePath}"
        export default {
            ...__vue_script__,
            template: __vue_template__
        }
    `
}

// module.exports.raw = true;