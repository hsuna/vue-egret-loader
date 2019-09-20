const path = require('path')
const normalize = require('./utils/normalize')
const selectorPath = normalize.lib('./compiler/selector')
const templatePath = normalize.lib('./compiler/template')

module.exports = function() {
    const filePath = this.resourcePath
    const shortFilePath = path.relative(this.context, filePath).replace(/\\/g, '/')
    const shortSelectorPath = path.relative(this.context, selectorPath).replace(/\\/g, '/')
    const shortTemplatePath = path.relative(this.context, templatePath).replace(/\\/g, '/')
    return `
        /* template */
        import __vue_template__ from "!!./${shortTemplatePath}!./${shortSelectorPath}?type=template&index=0&bustCache!./${shortFilePath}"
        /* script */
        import __vue_script__ from "!!babel-loader!./${shortSelectorPath}?type=script&index=0&bustCache!./${shortFilePath}"
        export default {
            ...__vue_script__,
            template: __vue_template__
        }
    `
}

// module.exports.raw = true;