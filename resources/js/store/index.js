import Vuex from "vuex";
import Vue from "vue";
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';

//Load vuex

Vue.use(Vuex);

//Create Store

const store = new Vuex.Store({
    modules:{
        auth
    },
    plugins: [createPersistedState]
});

export default store;