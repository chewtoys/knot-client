import Cookie from 'js-cookie'

export const setToken = token => {
  if (process.server) return
  Cookie.set('access_token', token)
}

export const getToken = req => {
  if (!req) {
    return Cookie.get('access_token')
  } else {
    console.log(req.headers.cookie)
    return req.headers.hasOwnProperty('cookie') && req.headers.cookie.indexOf('cookie') > -1
      ? req.headers.cookie
          .split(';')
          .find(c => c.trim().startsWith('access_token='))
          .split('=')[1]
      : false
  }
}
