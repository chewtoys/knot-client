import createPersistedState from 'vuex-persistedstate'
import get from 'lodash/get'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      getState() {
        if (window.localStorage.getItem('vuex')) {
          const state = JSON.parse(window.localStorage.getItem('vuex'))
          let timeline = get(state, 'posts.timeline', {})
          let userFeed = get(state, 'posts.userFeed', {})
          let timelineData = get(timeline, 'data', [])
          let userFeedData = get(userFeed, 'data', [])

          if (timelineData.length) {
            timeline.current_page = 1
            timelineData = timelineData.slice(0, 20)
          }

          if (userFeedData.length) {
            userFeed.current_page = 1
            userFeedData = userFeedData.slice(0, 20)
          }

          return state
        } else {
          return {}
        }
      }
    })(store)
  })
}
