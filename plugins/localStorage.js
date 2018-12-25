import createPersistedState from 'vuex-persistedstate'
import get from 'lodash/get'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      getState() {
        if (window.localStorage.getItem('vuex')) {
          const state = JSON.parse(window.localStorage.getItem('vuex'))
          let timeline = get(state, 'posts.timeline', {})
          let selectedProfile = get(state, 'posts.selectedProfile', {})
          let timelineData = get(timeline, 'data', [])
          let selectedProfileData = get(selectedProfile, 'posts.data', [])

          if (timelineData.length) {
            timeline.current_page = 1
            timelineData = timelineData.slice(0, 20)
          }

          if (selectedProfileData.length) {
            selectedProfile.posts.current_page = 1
            selectedProfileData = selectedProfileData.slice(0, 20)
          }

          return state
        } else {
          return {}
        }
      }
    })(store)
  })
}
