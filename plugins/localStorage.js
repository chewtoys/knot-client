import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      getState() {
        if (window.localStorage.vuex) {
          const state = JSON.parse(window.localStorage.vuex)
          if (state.posts.feed.length) {
            state.posts.feed.current_page = 1
            state.posts.feed.data = state.posts.feed.data.slice(0, 20)
          }

          return state
        } else {
          return {}
        }
      }
    })(store)
  })
}
