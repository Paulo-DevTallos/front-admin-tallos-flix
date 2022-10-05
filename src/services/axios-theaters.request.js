import { http } from './http'

export default {
  getTheaters: (token) => {
    return http.get('/theaters', token)
  },
 
  createTheater: (token, data) => {
    return http.post('/theaters', data, token)
  },

  removeTheater: (token, id) => {
    return http.delete(`/theaters/${id}`, token)
  }
}