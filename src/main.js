import Vue from 'vue';
import App from '../src/views/App';
import vuetify from './plugins/vuetify';
import store from './store';
import router from './router/router';
import VueGapi from 'vue-gapi'
import GoogleAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: '511484330482-6jk4r4f37masmgt6gtjvooirc0a3jvh7.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GoogleAuth, gauthOption)

Vue.use(VueGapi, {
  clientId: '511484330482-6jk4r4f37masmgt6gtjvooirc0a3jvh7.apps.googleusercontent.com',
  scope: 'email',
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
