import createPersistedState from 'vuex-persistedstate'
import get from 'lodash/get'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      getState() {
        const POSTS_PER_PAGE = 10
        if (window.localStorage.getItem('vuex')) {
          const state = JSON.parse(window.localStorage.getItem('vuex'))
          let timeline = get(state, 'posts.timeline', {})
          let selectedProfile = get(state, 'posts.selectedProfile', {})
          let timelineData = get(timeline, 'data', [])
          let selectedProfileData = get(selectedProfile, 'posts.data', [])

          if (timelineData.length) {
            timeline.current_page = 1
            timelineData = timelineData.slice(0, POSTS_PER_PAGE)
          }

          if (selectedProfileData.length) {
            selectedProfile.posts.current_page = 1
            selectedProfileData = selectedProfileData.slice(0, POSTS_PER_PAGE)
          }

          return state
        } else {
          return {}
        }
      }
    })(store)
  })
}
