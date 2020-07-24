import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faTrashAlt)
const base = axios.create({
  baseURL: 'http://localhost:4000',
})

Vue.prototype.$http = base
Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
