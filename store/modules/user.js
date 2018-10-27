import { SET_USER, SET_FRIENDSHIPS } from '~/store/mutation-types'
import client from '~/store/client'
import { setToken } from '~/utils/auth'

const state = {
  user: {},
  friendships: {
    friends: [],
    requests: [],
    outgoing: [],
    suggested: []
  }
}

const getters = {
  user: state => state.user,
  friendships: state => state.friendships
}

const mutations = {
  [SET_USER](state, user) {
    state.user = user
  },
  [SET_FRIENDSHIPS](state, friendships) {
    state.friendships = friendships
  }
}

const actions = {
  register({ commit }, user) {
    return client.post('/api/auth/user', user).then(res => {
      commit(SET_USER, res)
    })
  },
  login({ commit }, credentials) {
    return client
      .withProxy()
      .post('/api/auth', credentials)
      .then(res => {
        setToken(res.access_token)
      })
  },
  fetchUser({ commit }) {
    return client
      .withAuth()
      .get('/api/auth/user')
      .then(res => {
        commit(SET_USER, res)
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
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
