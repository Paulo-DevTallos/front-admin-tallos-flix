import { http } from "./http"

export default {
  getComments: () => {
    return http.get('/comments')
  },
}