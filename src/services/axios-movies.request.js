import { http } from "./http"

export default {
  getMovies: (token) => {
    return http.get('/movies', token)
  },

  createMovie: (token, data) => {
    console.log(data)
    return http.post('/movies', data, token)
  },

  findMovie: (token, title) => {
    return http.get(`/movies/search/${title}`, token)
  },

  updateMovie: (token, id, data) => {
    console.log(id)
    return http.patch(`/movies/${id}`, data, token)
  },

  removeMovie: (token, id) => {
    return http.delete(`/movies/${id}`, token)
  },
}