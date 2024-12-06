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

export const digest = async ({ algorithm = "SHA-256", message }) =>
    Array.prototype.map
        .call(
            new Uint8Array(
                await crypto.subtle.digest(algorithm, new TextEncoder().encode(message))
            ),
            (x) => ("0" + x.toString(16)).slice(-2)
        )
        .join("");