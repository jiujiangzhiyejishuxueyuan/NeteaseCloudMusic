import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/filters'

import methods from './utils/pubulicMethods'
import 'view-design/dist/styles/iview.css'
import {Icon,LoadingBar,Page,Input,Message,Slider,Spin,BackTop  } from "view-design";
Vue.component('Icon',Icon)
Vue.component('LoadingBar',LoadingBar)
Vue.component('Page',Page)
Vue.component('Input',Input)
Vue.component('Slider',Slider )
Vue.component('Spin',Spin )
Vue.component('BackTop',BackTop )
Vue.prototype.publicMethods = methods
Vue.prototype.$Message = Message
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    LoadingBar.start()
    if (to.meta.title) {
        document.title = to.meta.title + ' - 阿立音乐'
    } else {
        document.title = '阿立音乐'
    }
    next()
})
router.afterEach(() => {
  LoadingBar.finish();
})
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
