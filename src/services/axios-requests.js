import { http } from './http'

export default {
  listar: () => {
    return http.get('/users')
  },

  listarMovies: () => {
    return http.get('/movies')
  },

  listarComments: () => {
    return http.get('/comments')
  },

  login: (data) => {
    return http.post('/login', data)
  },

  remove: (id) => {
    return http.delete(`/users/${id}`)
  }
}