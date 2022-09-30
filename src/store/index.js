import Vue from 'vue'
import vuex from 'vuex'
import Service from '../services/axios-users.requests'
import ServiceMovies from '../services/axios-movies.request'
import ServiveComments from '../services/axios-comments.request'

Vue.use(vuex)

export default new vuex.Store({
  state: {
    user: {
      email: '',
      password: '',
    },
    token: '',
    users: [],
    movies: [],
    comments: [],
  },
  mutations: {
    authLogin(state, payload) {
      state.user = payload.user
      state.token = payload.access_token
    },
    
    getAllUsers(state, payload) {
      state.users = payload
      state.token = localStorage.getItem('token')
    },

    getAllComments(state, payload) {
      state.comments = payload
      state.token = localStorage.getItem('token')
    },
    
    getAllMovies(state, payload) {
      state.movies = payload
      state.token = localStorage.getItem('token')
    },
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
    handleUsersRequest(context, token) {
      Service.listar({ headers: { Authorization: token }}).then(res => {
        context.commit('getAllUsers', JSON.parse(JSON.stringify(res.data)))
      })
    },

    //get de comments
    handleCommentsRequest(context, token) {
      ServiveComments.getComments({ headers: { Authorization: token }}).then(res => {
        context.commit('getAllComments', JSON.parse(JSON.stringify(res.data)))
      })
    },

    //get de movies
    handleMoviesRequest(context, token) {
      ServiceMovies.getMovies({ headers: { Authorization: token }}).then(res => {
        context.commit('getAllMovies', JSON.parse(JSON.stringify(res.data)))
      })
    }
  }
})
