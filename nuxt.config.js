require('dotenv').config()
const pkg = require('./package')

module.exports = {
  mode: 'universal',
  modern: true,
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-title', content: 'Knot' },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent'
      },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-startup-image', href: '/launch.png' },
      { rel: 'apple-touch-icon', href: '/touch-icon-phone.png' },
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        href: '/touch-icon-ipad.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/touch-icon-iphone-retina.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '167x167',
        href: '/touch-icon-ipad-retina.png'
      },
      {
        rel: 'stylesheet',
        href: 'https://rsms.me/inter/inter-ui.css'
      }
    ],
    script: [
      {
        src:
          'https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver',
        body: true
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['~/assets/css/tailwind.scss'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/bugsnag.js', ssr: false },
    { src: '~/plugins/event-bus.js', ssr: true },
    { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/lazysizes.js', ssr: false },
    { src: '~/plugins/vue-picture-input.js', ssr: false },
    { src: '~/plugins/cloudinary.js', ssr: true }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-purgecss',
    [
      'vue-warehouse/nuxt',
      {
        vuex: false,
        plugins: ['store/plugins/expire'],
        storages: [
          'store/storages/localStorage',
          'store/storages/cookieStorage'
        ]
      }
    ]
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/api/auth',
            method: 'post',
            propertyName: 'access_token'
          },
          user: {
            url: `${process.env.BASE_URL}/api/auth/user`,
            method: 'get',
            propertyName: false
          },
          logout: false
        },
        tokenRequired: true,
        tokenType: 'Bearer'
      }
    },
    redirect: {
      login: '/auth/login',
      home: '/'
    },
    cookie: {
      options: {
        expires: 365
      }
    }
  },
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: '/'
  },

  router: {
    middleware: ['auth']
  },

  purgeCSS: {
    mode: 'postcss',
    styleExtensions: ['.scss'],
    whitelistPatterns: [
      /^pswp(.*)/,
      /(.*)-(enter|leave)(-(active|to))?/,
      /^picture-(input|preview)/,
      /^preview-container/
    ]
  },

  /*
  ** Build configuration
  */
  build: {
    postcss: {
      plugins: {
        tailwindcss: './tailwind.js',
        autoprefixer: {}
      }
    },
    extend(config, { isClient }) {
      if (isClient) {
        config.devtool = '#source-map'
      }
    }
    /*
    ** You can extend webpack config here
    */
    // extend(config, ctx) {
    //   // Run ESLint on save
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  }
}
