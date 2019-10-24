// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
 // 引用API文件
import api from './api/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueExcel from 'vue-element-excel'
Vue.use(ElementUI);
Vue.use(VueExcel);
Vue.config.productionTip = false

// 将API方法绑定到全局
Vue.prototype.$api = api
 // 引用工具文件
import formatDate from './utils/formatDate.js'
// 将工具方法绑定到全局
Vue.prototype.$formatDate = formatDate


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
