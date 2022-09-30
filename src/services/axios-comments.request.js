import { http } from "./http"

export default {
  getComments: (token) => {
    return http.get('/comments', token)
  },
}