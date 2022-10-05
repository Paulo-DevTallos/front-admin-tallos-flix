import { http } from "./http"

export default {
  getComments: (token) => {
    return http.get('/comments', token)
  },

  createComment: (token, data) => {
    return http.post('/comments', data, token)
  },

  findComment: (token, name) => {
    return http.get(`comments/search/${name}`, token)
  },

  removeComment: (token, id) => {
    return http.delete(`/comments/${id}`, token)
  }
}