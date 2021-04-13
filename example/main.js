import VueEgret from 'vue-egret'
import Foo from './components/source.vue'

console.log(Foo);
window.Main = VueEgret.classMain({
  render: h => h(Foo)
})
