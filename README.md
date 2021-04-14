# vue-egret-loader [![Windows Build status](https://ci.appveyor.com/api/projects/status/8cdonrkbg6m4k1tm/branch/master?svg=true)](https://ci.appveyor.com/project/hsuna/vue-egret-loader/branch/master)

> 用于VueEgret单文件组件的webpack加载器

- [文档](https://hsuna.github.io/vue-egret/guide/single-file-components.html)

## 什么是VueEgret Loader？

`vue-egret-loader` 基于 [webpack](https://webpack.js.org/) 的加载器，它允许你使用 [单文件组件 (SFCs)] 来开发你的VueEgret组件。

```vue
<template>
  <Sprite>
    <TextField
      textColor="#00FFFF"
      x="11"
      y="12"
      touchEnabled
      @touchTap="onLabelClick"
      >{{ text }}</TextField
    >
  </Sprite>
</template>

<script>
export default {
  data() {
    return {
      text: "fesfff",
    };
  },
  methods: {
    onLabelClick() {
      egret.log('click', this.text);
    },
  },
}
</script>
```

简而言之，webpack和 `vue-loader` 的组合为您提供了用于创作VueEgret 应用程序的现代，灵活且功能强大的前端工作流。

## 它是怎么工作的？

> 以下部分是针对对`vue-loader`的内部实现细节感兴趣的维护者和贡献者的，并且对最终用户而言不是 **必需** 的知识。

`vue-loader`不是一个简单的源转换加载器。它是借助的VueEgret的预编译方法(`vue-egret/libs/prerender`)，将`template`节点解析成`render`函数再导出：

```javascript
// import the <script> block
import __vue_script__ from 'source.vue?vue&type=script'
// import the <template> block
import __vue_prerender__ from 'source.vue?vue&type=template'

export * from 'source.vue?vue&type=script'
export default {
  ...__vue_script__,
  render: __vue_prerender__,
}
```