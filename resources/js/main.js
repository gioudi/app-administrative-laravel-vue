require('./bootstrap');



import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import GLightbox from 'glightbox';
import VeeValidate from 'vee-validate';

Vue.use(GLightbox);
Vue.use(VeeValidate);

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';



Vue.use(ViewUI);


import common from './common';

Vue.mixin(common);
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:3000/'

Vue.config.productionTip = false




axios.interceptors.response.use(undefined, function(error){
  if(error){
    const originalRequest = error.config;
    if(error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch('LogOut');
      return router.push('/login');
    }
  }
})

new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app')
