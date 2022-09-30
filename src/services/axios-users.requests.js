import { http } from './http'

export default {
  listar: () => {
    return http.get('/users')
  },

  create: (data) => {
    return http.post('/users', data)
  },

  update: (id, data) => {
    return http.patch(`/users/${id}`, data)
  },

  login: (data) => {
    return http.post('/login', data)
  },

  remove: (id) => {
    return http.delete(`/users/${id}`)
  }
}