import Vue from 'vue'
import App from './App'
import router from './router'
import vuelazyload from 'vue-lazyload'
import store from '../src/store'
Vue.config.productionTip = false

Vue.use(vuelazyload,{
	loading:require('../src/components/header/icon.png')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
