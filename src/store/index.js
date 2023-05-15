import {createStore} from 'vuex';
import axiosClient from '../axios'
import axios from 'axios'
import router from '../router'
const base = 'http://anbar.live/api/'
const store = createStore({
    state:{
        user:{
            data:null,
            token:null,
            admin:null
        },
        loading: true,
        search:{
            merchant:null
        },
        category:false,
        api: base
    },
    getters:{},
    mutations:{
        logout(state){
            state.user.data = {};
            state.user.token = null;
            localStorage.removeItem('TOKEN')
        },
        register(state,data){
            state.user.data = data.user
            state.user.token = localStorage.setItem('TOKEN',data.token)
            if(data.user.is_admin){
                state.user.admin = true
            }
            state.loading = false
        },
        loadik(state,data){
            state.user.data = data.user
            state.user.token = localStorage.getItem('TOKEN')
            if(data.user.role === 'admin' || data.user.role === 'moderator'){
                state.user.admin = true
            }
            state.loading = false
        },
        endload(state){
            localStorage.removeItem('TOKEN');
            state.loading = false
        },
        setCategory(state,category){
            state.category = category
        }
    },
    actions:{
        register: async ({commit},user) => {
                await axios.post(base+'register',user)
                .then((response) => {
                    commit('register',response.data);
                })
            },
        login: async ({commit},user) => {
                await axios.post(base+'login',user)
                .then((response) => {
                    commit('register',response.data);
                })
            },
        alogin: async ({commit},user) => {
                await axios.post(base+'alogin',user)
                .then((response) => {
                    commit('register',response.data);
                })
            },
        logout: async ({commit}) => {
                await axios.post(base+'logout',null,{
                    headers: {
                        Authorization: 'Bearer '+localStorage.getItem('TOKEN')
                    }
                }).then((response) => {
                    router.push('Salam')
                }).catch(err=>{
                    console.log(err.response.data.message)
                })
            },
        loadUser: async({commit,dispatch}) => {
            try{
               await axios.post(base+'yoxla',null,{
                    headers: {
                        Authorization: 'Bearer '+localStorage.getItem('TOKEN')
                    }
                }).then((response)=>{
                    commit('loadik',response.data)
                    router.push({name:'Product'})
                })
            }catch(error){
                commit('endload')
                router.push({name:'Salam'})
            }
        },
        addproduct: async({commit},selected) => {
            try{
                await axios.post(base+'addproduct',selected,{
                    headers: {
                        Authorization: 'Bearer '+localStorage.getItem('TOKEN')
                    }
                }).then((response)=>{
                    alert(response.data.message)
                })
            }catch(error){
                alert(error.response.data.message)
            }
        },
        addbrand: async({commit},selected) => {
                await axios.post(base+'addbrand',selected,{
                    headers: {
                        Authorization: 'Bearer '+localStorage.getItem('TOKEN')
                    }
                }).then((response)=>{
                    alert(response.data.message)
                })
        },
        addmerchant: async({commit},selected) => {
            await axios.post(base+'addmerchant',selected,{
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('TOKEN')
                }
            }).then((response)=>{
                alert(response.data.message)
            })
        },
        addcategory: async({commit},selected) => {
            await axios.post(base+'addcategory',selected,{
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('TOKEN')
                }
            }).then((response)=>{
                commit('setCategory',response.data.category)
                alert(response.data.message)
            })
        },
        adduser: async({commit},selected) => {
            await axios.post(base+'adduser',selected,{
                headers: {
                    Authorization: 'Bearer '+localStorage.getItem('TOKEN')
                }
            }).then((response)=>{
                alert(response.data.message)
            }).catch((error)=>{
                alert(error.response.data.message)
            })
        }
    },
    modules:{}
})

export default store;
