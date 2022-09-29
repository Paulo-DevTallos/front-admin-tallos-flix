import { http } from "./http"

export default {
  getMovies: () => {
    return http.get('/movies')
  },

  deleteMovie: (id) => {
    return http.delete(`/movies/${id}`)
  },
}