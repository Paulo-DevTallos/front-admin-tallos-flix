import { http } from "./http"

export default {
  getMovies: () => {
    return http.get('/movies')
  },
}