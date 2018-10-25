import axios from 'axios'
import { Promise } from 'es6-promise'
import { getToken } from '~/utils/auth'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

const client = {
  auth: false,
  proxy: false,
  apiRoot: process.env.baseUrl,
  withAuth() {
    client.auth = true
    return client
  },
  withProxy() {
    client.proxy = true
    return client
  }
}

const httpMethods = ['get', 'post', 'put', 'patch', 'delete']

httpMethods.forEach(verb => {
  client[verb] = (url, data = {}, headers = {}) => {
    return new Promise((resolve, reject) => {
      axios({
        method: verb,
        url: `${client.proxy ? '' : client.apiRoot}${url}`,
        data,
        headers:
          client.auth && getToken()
            ? { Authorization: `Bearer ${getToken()}`, ...headers }
            : headers
      })
        .then(res => {
          client.auth = false
          client.proxy = false
          resolve(res.data)
        })
        .catch(error => {
          client.auth = false
          client.proxy = false
          if (error.response) {
            reject(error.response.data)
          } else {
            reject(error)
          }
        })
    })
  }
})

export default client
