import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/filters'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

import 'view-design/dist/styles/iview.css'
import {Icon,LoadingBar,Page,Input,Message,Slider,  } from "view-design";
Vue.component('Icon',Icon)
Vue.component('LoadingBar',LoadingBar)
Vue.component('Page',Page)
Vue.component('Input',Input)
Vue.component('Slider',Slider )
// Vue.component('Button',Button)
// Vue.component('DropdownMenu',DropdownMenu)
// Vue.component('DropdownItem',DropdownItem)
// Vue.component('Dropdown',Dropdown)

Vue.prototype.$Message = Message
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  LoadingBar.start();
  next()
})
router.afterEach(() => {
  LoadingBar.finish();
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
