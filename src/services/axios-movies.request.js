import { http } from "./http"

export default {
  getMovies: (token) => {
    return http.get('/movies', token)
  },

  deleteMovie: (token, id) => {
    return http.delete(`/movies/${id}`, token)
  },
}