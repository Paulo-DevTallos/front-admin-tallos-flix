import { http } from './http'

export default {
  getTheaters: () => {
    return http.get('/theaters')
  },

  getPaginatedTheaters: (limit, skip) => {
    return http.get(`/theaters/paginate?limit=${limit}&skip=${skip}`) 
  },

  findTheater(token, cod) {
    return http.get(`/theaters/search/${cod}`, token)
  },

  updateTheater(id, data) {
    return http.patch(`/theaters/${id}`, data)
  },
 
  createTheater: (token, data) => {
    return http.post('/theaters', data, token)
  },

  removeTheater: (token, id) => {
    return http.delete(`/theaters/${id}`, token)
  }
}