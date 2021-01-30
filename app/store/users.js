export const state = () => ({
  users: [],
})

export const getters = {
  users: (state) => state.users,
}

export const mutations = {
  addUser(state, { user }) {
    state.users.push(user)
  },

  clearUser(state) {
    state.users = []
  },
}

export const actions = {
  async fetchUser({ commit }, { id }) {
    const user = await this.$axios.$get(`/users/${id}.json`)
    commit('clearUser')
    commit('addUser', { user })
  },
}
