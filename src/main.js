// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import "babel-polyfill"
import ut from '@/constants/utils'
Vue.prototype.$ut = ut;
import VueBus from '@/constants/vue-bus'
import store from '@/store'
import router from '@/router'
import axios from '@/axios'
Vue.prototype.$axios = axios
//import api from '@/constants/api'
//Vue.prototype.$api = api
//import http from '@/constants/http'
//Vue.prototype.$http = http
//import ElementUI from 'element-ui'
import moment from 'moment'
Vue.prototype.$moment = moment
import Antd from 'ant-design-vue'
import $ from 'jquery'
import '@/assets/css/global.css'
//import 'element-ui/lib/theme-chalk/index.css'
import 'ant-design-vue/dist/antd.css'
import '@/assets/css/main.css'
Vue.use(Antd)
Vue.use(VueBus);
//Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
