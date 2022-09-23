import Vue from "vue"
import vuex from 'vuex'
import Service from '../services/axios-requests'

Vue.use(vuex)

export default new vuex.Store({
  state:{
    user: {
      name: null,
      email: null,
      password: null,
    },
    access_token: null,
  },
  mutations: {
    'authLogin'(state, payload) {
      state.access_token = payload.access_token
      state.user = payload.user
    }
  },
  actions: {
    async handleSubmitLogin({ commit }, user) {
      await Service.login(user).then(res => {
        const responseUserData = {
          user: user,
          token: res.data.access_token
        }

        localStorage.setItem('token', res.data.access_token)
        localStorage.setItem('email', user.email)

        commit('authLogin', responseUserData)

        window.location.replace('/#/admin/overview')
      })
    }
  },
  modules: {}
})

