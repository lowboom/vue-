import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import store from './store/'

import './assets/css/bootstrap.min.css'
import './assets/css/bootstrap-table.min.css'
import './assets/js/bootstrap.min'
import './assets/js/bootstrap-table.min.js'
import './assets/js/bootstrap-datetimepicker.min.js'
import './assets/css/bootstrap-datetimepicker.min.css'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)



Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
