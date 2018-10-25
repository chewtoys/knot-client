import { ADD_COMMENT, SET_FEED, ADD_REACTION } from '~/store/mutation-types'
import client from '~/store/client'

const state = {
  feed: []
}

const getters = {
  feed: state => state.feed
}

const mutations = {
  [SET_FEED](state, items) {
    state.feed = items
  },
  [ADD_COMMENT](state, { id, comment }) {
    state.feed = state.feed.map(post => {
      if (post.id === id) {
        post.comments.push(comment)
      }

      return post
    })
  },
  [ADD_REACTION](state, { id, reactions }) {
    state.feed = state.feed.map(post => {
      if (post.id === id) {
        post.reactions = reactions
      }

      return post
    })
  }
}

const actions = {
  fetchFeed({ commit }) {
    client
      .withAuth()
      .get(`/api/feed`)
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
  addTextPost({ commit, dispatch }, post) {
    client.withAuth().post('/api/posts/new/text', post)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
