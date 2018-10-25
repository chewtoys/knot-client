import https from 'https'

export default function({ $axios, redirect }) {
  const agent = new https.Agent({
    rejectUnauthorized: false
  })
  $axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest'
  }
  $axios.onRequest(config => {
    if (process.env.dev) {
      config.httpsAgent = agent
    }
  })
}
