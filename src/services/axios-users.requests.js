import { http } from './http'

export default {
  listar: (token) => {
    return http.get('/users', token)
  },

  create: (token, data) => {
    return http.post('/users', token, data)
  },

  update: (token, id, data) => {
    return http.patch(`/users/${id}`, data, token)
  },

  login: (data) => {
    return http.post('/login', data)
  },

  remove: (token, id) => {
    return http.delete(`/users/${id}`, token)
  }
}