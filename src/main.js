import Vue from 'vue';
import App from '../src/views/App';
import vuetify from './plugins/vuetify';
import store from './store';
import router from './router/router';
import GAuth from 'vue-google-oauth2';

const gauthOption = {
  clientId: 'CLIENT_ID.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
