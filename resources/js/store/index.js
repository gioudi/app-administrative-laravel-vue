import Vuex from "vuex";
import Vue from "vue";
import createPersistedState from 'vuex-persistedstate';
import auth from './modules/auth';

//Load vuex

Vue.use(Vuex);

//Create Store

const store = new Vuex.Store({
    state: {
        counter: 0,
        deleteModalObj: {
            showModalDelete: false,
            deleteUrl: '',
            data: null,
            deleteIndex: -1,
            isDeleted: false,
            successMsg: '',
            msg:''
        },

    },
    getters: {
        getDeleteModalObj(state) {
            return state.deleteModalObj
        },
        getUser(state) {
            return state.user
        }
    },
    mutations: {
        setDeleteModal(state,valueDeleting){
             const deleteModalObj = {
                 showModalDelete: false,
                 deleteUrl: '',
                 data: null,
                 deletingIndex: -1,
                 isDeleted: valueDeleting,
                 successMsg: 'Elemento eliminado'
             }
             state.deleteModalObj =  deleteModalObj;
        },
        setDeletingModalObj(state, data){
             state.deleteModalObj = data
        },

    },
    modules:{
        auth
    },
    plugins: [createPersistedState()]
});

export default store;
