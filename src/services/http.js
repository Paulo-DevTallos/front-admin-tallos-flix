import axios from 'axios'

export const http = axios.create({
  baseURL: `http://150.230.78.209:18000/app`
})