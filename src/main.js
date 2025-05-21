import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'virtual:svg-icons-register'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import VueCompositionAPI from '@vue/composition-api'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
// 全局引入自定义组件
import Comps from '@/comps'

import Directive from '@/directive'
import '@wangeditor/editor/dist/css/style.css'
import 'bytemd/dist/index.css'

Vue.use(VueCompositionAPI)
Vue.use(ElementUI, { size: 'medium' })
Vue.use(Comps)
Vue.use(Directive)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
