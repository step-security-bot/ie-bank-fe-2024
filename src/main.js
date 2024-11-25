import Vue from 'vue'
import App from './App.vue'
import router from './router'
//install bootstrap first
import 'bootstrap/dist/css/bootstrap.css'
import BootstrapVue from "bootstrap-vue";
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(VueCookies, {expires: '1d'});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
