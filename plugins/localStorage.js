import createPersistedState from 'vuex-persistedstate'
import get from 'lodash/get'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      getState() {
        if (window.localStorage.getItem('vuex')) {
          const state = JSON.parse(window.localStorage.getItem('vuex'))
          let feed = get(state, 'posts.feed', {})
          let feedData = get(feed, 'data', [])
          if (feedData.length) {
            feed.current_page = 1
            feedData = feedData.slice(0, 20)
          }

          return state
        } else {
          return {}
        }
      }
    })(store)
  })
}
