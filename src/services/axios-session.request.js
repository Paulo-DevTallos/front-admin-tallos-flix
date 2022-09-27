import { http } from './http'

export default {
  listSession: () => {
    return http.get('/sessions')
  }
}