export const state = () => ({
  isLoggedIn: false,
  user: null,
})

export const getters = {
  isLoggedIn: (state) => state.isLoggedIn,
  user: (state) =>
    state.user ? Object.assign({ likes: [] }, state.user) : null,
}

export const mutations = {
  setUser(state, { user }) {
    if (user.id.match(/_|@|\./)) {
      throw new TypeError('invalid username')
    }
    state.user = user
    state.isLoggedIn = true
  },

  updateUser(state, { user }) {
    state.user = user
  },
}

export const actions = {
  async login({ commit }, { id }) {
    if (id.match(/_|@|\./)) {
      throw new TypeError('invalid username')
    }
    const user = await this.$axios.$get(`/users/${id}.json`)
    // console.log(user)
    if (!user.id) throw new Error('Invalid user')
    commit('setUser', { user })
  },

  async register({ commit }, { id }) {
    const payload = {}
    payload[id] = { id }
    await this.$axios.$patch(`/users.json`, payload)
    const user = await this.$axios.$get(`/users/${id}.json`)
    if (!user.id) throw new Error('Invalid user')
    commit('setUser', { user })
  },
}
