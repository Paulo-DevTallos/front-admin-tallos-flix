import { http } from './http'

export default {
  listar: () => {
    return http.get('/users')
  },

  login: (data) => {
    return http.post('/login', data)
  },

  remove: (id) => {
    console.log(id)
    return http.delete(`/users/${id}`)
  }
}