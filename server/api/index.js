const Router = require('koa-router')
const axios = require('axios')
const https = require('https')

const router = new Router({ prefix: '/api' })

router.post('/auth', async (ctx, next) => {
  const agent = new https.Agent({
    rejectUnauthorized: false
  })
  const body = ctx.request.body
  const auth = await axios.post(
    `${process.env.BASE_URL}/oauth/token`,
    {
      grant_type: 'password',
      client_id: process.env.KNOT_CLIENT_ID,
      client_secret: process.env.KNOT_CLIENT_SECRET,
      username: body.email,
      password: body.password,
      scope: ''
    },
    { httpsAgent: agent }
  )
  ctx.status = 200
  ctx.body = auth.data
})

router.post('/location/current', async (ctx, next) => {
  const body = ctx.request.body
  const location = await axios.get(
    `https://api.opencagedata.com/geocode/v1/json?q=${body.lat}+${
      body.long
    }&key=${process.env.OPENCAGE_API_KEY}`
  )
  ctx.status = 200
  ctx.body = location.data
})

router.post('/location/nearby', async (ctx, next) => {
  const body = ctx.request.body
  const nearby = await axios.get(
    `https://api.foursquare.com/v2/venues/search?ll=${body.lat},${
      body.long
    }&client_id=${process.env.FOURSQUARE_CLIENT_ID}&client_secret=${
      process.env.FOURSQUARE_CLIENT_SECRET
    }&v=20170521`
  )
  ctx.status = 200
  ctx.body = nearby.data
})
// router.post('/auth', function(req, res, next) {
//   axios
//     .post('https://knot.test/oauth/token', {
//       grant_type: 'password',
//       client_id: process.env.KNOT_CLIENT_ID,
//       client_secret: process.env.KNOT_CLIENT_SECRET,
//       username: req.body.email,
//       password: req.body.password,
//       scope: '*'
//     })
//     .then(response => {
//       res.send(response.data)
//     })
//     .catch(e => {
//       res.status(500).send({ error: 'Invalid credentials' })
//     })
// })

// router.post('/location/current', function(req, res, next) {
//   axios
//     .get(
//       `http://api.opencagedata.com/geocode/v1/json?q=${req.body.lat}+${
//         req.body.long
//       }&key=${process.env.OPENCAGE_API_KEY}`
//     )
//     .then(response => {
//       res.send(response.data)
//     })
//     .catch(e => {
//       console.log(JSON.stringify(e))
//     })
// })

// router.post('/location/nearby', function(req, res, next) {
//   axios
//     .get(
//       `https://api.foursquare.com/v2/venues/search?ll=${req.body.lat},${
//         req.body.long
//       }&client_id=${process.env.FOURSQUARE_CLIENT_ID}&client_secret=${
//         process.env.FOURSQUARE_CLIENT_SECRET
//       }&v=20170521`
//     )
//     .then(response => {
//       res.send(response.data)
//     })
//     .catch(e => {
//       console.log(JSON.stringify(e))
//     })
// })

module.exports = router
