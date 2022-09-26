import Vue from 'vue'
import vuex from 'vuex'
import Service from '../services/axios-requests'

Vue.use(vuex)

export default new vuex.Store({
  state: {
    user: {
      email: '',
      password: '',
    },
    token: ''
  },
  mutations: {
    authLogin(state, payload) {
      state.user = payload.user
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
    }
  }
})
