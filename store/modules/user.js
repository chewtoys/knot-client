import { SET_USER, SET_FRIENDSHIPS } from '~/store/mutation-types'
import client from '~/store/client'

const state = {
  friendships: {
    friends: [],
    requests: [],
    outgoing: [],
    suggested: []
  }
}

const getters = {
  friendships: state => state.friendships
}

const mutations = {
  [SET_FRIENDSHIPS](state, friendships) {
    state.friendships = friendships
  }
}

const actions = {
  register({ commit }, user) {
    return client.post('/api/auth/user', user).then(res => {
      // commit(SET_USER, res)
    })
  },
  fetchFriendships({ commit }) {
    return client
      .withAuth()
      .get('/api/friendships')
      .then(res => {
        commit(SET_FRIENDSHIPS, res)
      })
  },
  requestFriendship({ commit }, userId) {
    return client
      .withAuth()
      .post(`/api/friendships/add/${userId}`)
      .then(res => {
        commit(SET_FRIENDSHIPS, res)
      })
  },
  acceptFriendship({ commit }, senderId) {
    return client
      .withAuth()
      .post(`/api/friendships/accept/${senderId}`)
      .then(res => {
        commit(SET_FRIENDSHIPS, res)
      })
  },
  denyFriendship({ commit }, senderId) {
    return client
      .withAuth()
      .post(`/api/friendships/deny/${senderId}`)
      .then(res => {
        commit(SET_FRIENDSHIPS, res)
      })
  },
  updateAvatar({ commit }, formData) {
    return client
      .withAuth()
      .post('/api/profile/avatar', formData)
      .then(res => {
        commit(SET_USER, res)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
