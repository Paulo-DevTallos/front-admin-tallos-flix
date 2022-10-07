import Vue from 'vue'
import vuex from 'vuex'
import Service from '../services/axios-users.requests'
import ServiceMovies from '../services/axios-movies.request'
import ServiveComments from '../services/axios-comments.request'
import ServiceTheaters from '../services/axios-theaters.request'

Vue.use(vuex)

export default new vuex.Store({
  state: {
    user: {
      email: '',
      password: '',
    },
    token: '',
    users: [],
    countUsers: 'loading',
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

    getAllComments(state, payload) {
      state.countComments = payload
    },
    
    getAllMovies(state, payload) {
      state.movies = payload
      state.token = localStorage.getItem('token')
    },

    getAllTheatersCount(state, payload) {
      state.countTheaters = payload
    },

    getAllTheaters(state, payload) {
      state.theaters = payload
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

    //get de comments
    async handleCommentsRequest(context, token) {
      await ServiveComments.getComments({ headers: { Authorization: token }}).then(res => {
        context.commit('getAllComments', res.data.countComments)
      })
    },

    //get de movies
    /*async handleMoviesRequest(context, token) {
      await ServiceMovies.getMovies({ headers: { Authorization: token }}).then(res => {
        context.commit('getAllMovies', JSON.parse(JSON.stringify(res.data)))
      })
    },*/

    //get de theaters
    async handleTheatersRequest(context, token) {
      await ServiceTheaters.getTheaters({ headers: { Authorization: token }}).then(res => {
        context.commit('getAllTheatersCount', res.data.countTheaters)
      }) 
    },

    async handleTheaters(context, token) {
      await ServiceTheaters.getTheaters({ headers: { Authorization: token }}).then(res => {
        context.commit('getAllTheaters', res.data.theaters)
      })
    }
  }
})
