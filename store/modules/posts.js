import { ADD_COMMENT, SET_FEED, ADD_REACTION } from '~/store/mutation-types'
import client from '~/store/client'

const state = {
  feed: {
    current_page: 1,
    last_page: 1,
    data: []
  }
}

const getters = {
  feed: state => state.feed
}

const mutations = {
  [SET_FEED](state, feed) {
    if (feed.current_page === 1) {
      state.feed = feed
    } else {
      state.feed = { ...feed, data: [...state.feed.data, ...feed.data] }
    }
  },
  [ADD_COMMENT](state, { id, comment }) {
    state.feed.data = state.feed.data.map(post => {
      if (post.id === id) {
        return { ...post, comments: [...post.comments, comment] }
      } else {
        return post
      }
    })
  },
  [ADD_REACTION](state, { id, reactions }) {
    state.feed.data = state.feed.data.map(post => {
      if (post.id === id) {
        return { ...post, reactions }
      } else {
        return post
      }
    })
  }
}

const actions = {
  fetchFeed({ commit }, page = 1) {
    client
      .withAuth()
      .get(`/api/feed?page=${page}`)
      .then(res => {
        commit(SET_FEED, res)
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
        dispatch('fetchFeed')
      })
  },
  addPhotoPost({ dispatch }, formData) {
    client
      .withAuth()
      .post('/api/posts/new/photo', formData)
      .then(_res => {
        dispatch('fetchFeed')
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
