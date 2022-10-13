import axios from 'axios'

export const http = axios.create({
  baseURL: `https://kong.desenvolvimento.tallos.com.br/app`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
  //baseURL api local: `http://localhost:3008`,
  //baseURL api kong serveer: `http://150.230.78.209:18000/app`
})
