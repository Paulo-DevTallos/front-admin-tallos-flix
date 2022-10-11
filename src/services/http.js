import axios from 'axios'

export const http = axios.create({
  baseURL: `https://kong.desenvolvimento.tallos.com.br/app`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
  //baseURL: `http://localhost:3008`,
  //baseURL: `http://150.230.78.209:18000/app`
})
