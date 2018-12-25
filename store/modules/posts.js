import {
  ADD_COMMENT,
  SET_TIMELINE,
  SET_SELECTED_PROFILE,
  ADD_REACTION
} from '~/store/mutation-types'
import client from '~/store/client'

const state = {
  timeline: {
    current_page: 1,
    last_page: 1,
    data: []
  },
  selectedProfile: {
    user: {},
    posts: {
      current_page: 1,
      last_page: 1,
      data: []
    }
  }
}

const getters = {
  timeline: state => state.timeline,
  selectedProfile: state => state.selectedProfile
}

const mutations = {
  [SET_TIMELINE](state, timeline) {
    if (timeline.current_page === 1) {
      state.timeline = timeline
    } else {
      state.timeline = {
        ...timeline,
        data: [...state.timeline.data, ...timeline.data]
      }
    }
  },
  [SET_SELECTED_PROFILE](state, profile) {
    if (profile.posts.current_page === 1) {
      state.selectedProfile = profile
    } else {
      state.selectedProfile = {
        user: profile.user,
        posts: {
          ...profile.posts,
          data: [...state.selectedProfile.posts.data, ...profile.posts.data]
        }
      }
    }
  },
  [ADD_COMMENT](state, { id, comment }) {
    state.timeline.data = state.timeline.data.map(post => {
      if (post.id === id) {
        return { ...post, comments: [...post.comments, comment] }
      } else {
        return post
      }
    })
    state.selectedProfile.posts.data = state.selectedProfile.posts.data.map(
      post => {
        if (post.id === id) {
          return { ...post, comments: [...post.comments, comment] }
        } else {
          return post
        }
      }
    )
  },
  [ADD_REACTION](state, { id, reactions }) {
    state.timeline.data = state.timeline.data.map(post => {
      if (post.id === id) {
        return { ...post, reactions }
      } else {
        return post
      }
    })
    state.selectedProfile.posts.data = state.selectedProfile.posts.data.map(
      post => {
        if (post.id === id) {
          return { ...post, reactions }
        } else {
          return post
        }
      }
    )
  }
}

const actions = {
  fetchTimeline({ commit }, page = 1) {
    client
      .withAuth()
      .get(`/api/timeline?page=${page}`)
      .then(res => {
        commit(SET_TIMELINE, res)
      })
  },
  fetchSelectedProfile({ commit }, { id, page = 1 }) {
    client
      .withAuth()
      .get(`/api/profile/${id}?page=${page}`)
      .then(res => {
        commit(SET_SELECTED_PROFILE, res)
      })
  },
  addComment({ commit }, commentData) {
    client
      .withAuth()
      .post(`/api/posts/${commentData.id}/comments`, commentData)
      .then(res => {
        commit(ADD_COMMENT, {
          id: commentData.id,
          comment: res
        })
      })
  },
  addReaction({ commit }, { id, reaction }) {
    client
      .withAuth()
      .post(`/api/posts/${id}/reactions`, reaction)
      .then(res => {
        commit(ADD_REACTION, {
          id,
          reactions: res.reactions
        })
      })
  },
  addTextPost({ dispatch }, post) {
    client
      .withAuth()
      .post('/api/posts/new/text', post)
      .then(_res => {
        dispatch('fetchTimeline')
      })
  },
  addPhotoPost({ dispatch }, formData) {
    client
      .withAuth()
      .post('/api/posts/new/photo', formData)
      .then(_res => {
        dispatch('fetchTimeline')
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
