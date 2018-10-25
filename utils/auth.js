import Cookie from 'js-cookie'

export const setToken = token => {
  if (process.server) return
  Cookie.set('access_token', token)
}

export const getToken = req => {
  return Cookie.get('access_token')
  // if (!req) {
  //   return Cookie.get('access_token')
  // } else {
  //   return req.headers.hasOwnProperty('cookie')
  //     ? req.headers.cookie
  //         .split(';')
  //         .find(c => c.trim().startsWith('access_token='))
  //         .split('=')[1]
  //     : false
  // }
}
