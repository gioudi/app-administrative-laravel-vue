import axios from 'axios';

const state = {
    user:null,
    posts:null,
};
const getters = {
    isAuthenticated: state => !!state.user,
    StatePosts: state => state.posts,
    StateUser: state => state.user
};
const actions = {

    async Register({dispatch}, form){
        await axios.post('api/register', form)
        let UserForm = new FormData();
        UserForm.append('email', form.email);
        UserForm.append('password', form.password);

        await dispatch('LogIn',UserForm);
    },
     async LogIn({commit}, User) {
         await axios.post('api/login',User);
         await commit('setUser', User.get('email'));

     },
     async CreatePost({dispatch}, post){
         await axios.post('api/post', post);
         await dispatch('GetPosts');
     },
     async GetPosts({commit}){
         let response = await axios.get('api/posts');
         commit('setPosts', response.data);
     },
     async LogOut({commit}){
         let user = null;
         commit('LogOut', user);
     }
};
const mutations = {
    setUser(state, email){
        state.user = email;
    },
    setPosts(state,posts){
        state.posts = posts;
    },
    LogOut(state) {
        state.user = null;
        state.posts = null;
    }
};

export default {
    state,getters,actions,mutations
};
