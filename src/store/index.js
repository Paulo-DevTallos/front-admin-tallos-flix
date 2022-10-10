import Vue from 'vue'
import vuex from 'vuex'
import Service from '../services/axios-users.requests'
import ServiceTheater from '../services/axios-theaters.request'

Vue.use(vuex)

export default new vuex.Store({
  state: {
    user: {
      email: '',
      password: '',
    },
    token: localStorage.getItem('token'),
    countUsers: 'loading',
    users: [],
    countMovies: 'loading',
    movies: [],
    countComments: 'loading',
    comments: [],
    countTheaters: 'loading',
    theaters: [],

  },
  mutations: {
    authLogin(state, payload) {
      state.user = payload.user
      state.token = payload.access_token
    },
    
    getAllUsersCount(state, payload) {
      state.countUsers = payload
    },

    getAllTheaters(state, payload) {
      state.theaters = payload
      state.token = payload.access_token
    }
  },
  actions: {
    handleSubmitLogin(context, payload) {
      Service.login({
        email: payload.email,
        password: payload.password
      }).then(res => {
        if(res.status === 200) {
          if(res.data.access_token) {
            localStorage.setItem('token', res.data.access_token)
            localStorage.setItem('email', res.data._doc.email)
            localStorage.setItem('username', res.data._doc.name)
          }
        }
        context.commit('authLogin', res.data)

        window.location.replace('/#/admin/overview')
      })
    },

    //get de usuarios
    async handleUsersRequest(context, token) {
      await Service.listar({ headers: { Authorization: token }}).then(res => {
        context.commit('getAllUsersCount', res.data.countUsers)
      })
    },

    async handleTheatersRequest(context, token) {
      await ServiceTheater.getAllTheaters({ headers: { Authorization: token }}).then(res => {
        context.commit('getAllTheaters', res.data.theaters)
      })
    }
  }
})
