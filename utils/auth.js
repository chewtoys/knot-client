import Cookie from 'js-cookie'
import ls from 'local-storage'

export const setToken = token => {
  if (process.server) return
  Cookie.set('access_token', token)
  ls('access_token', token)
}

export const getToken = req => {
  if (!req) {
    return Cookie.get('access_token')
      ? Cookie.get('access_token')
      : ls('access_token')
  } else {
    return req.headers.hasOwnProperty('cookie') &&
      req.headers.cookie.indexOf('access_token') > -1
      ? req.headers.cookie
          .split(';')
          .find(c => c.trim().startsWith('access_token='))
          .split('=')[1]
      : false
  }
}
