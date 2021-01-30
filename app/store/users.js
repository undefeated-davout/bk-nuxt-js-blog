import moment from '~/plugins/moment'

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
  addUserPost(state, { user, post }) {
    state.userPosts[user.id].push(post)
  },
  clearUserPosts(state, { user }) {
    state.userPosts[user.id] = []
  },
}

export const actions = {
  async fetchUser({ commit }, { id }) {
    const user = await this.$axios.$get(`/users/${id}.json`)
    commit('addUser', { user })
  },
  async addLikeLogToUser({ commit }, { user, post }) {
    post.likes.push({
      createdAt: moment().format(),
      userID: user.id,
      postID: post.id,
    })
    const newPost = await this.$axios.$put(`/posts/${post.id}.json`, post)
    commit('updatePost', { post: newPost })
  },
  async removeLikeLogToUser({ commit }, { user, post }) {
    post.likes = post.likes.filter((like) => like.userID !== user.id) || []
    const newPost = await this.$axios.$put(`/posts/${post.id}.json`, post)
    commit('updatePost', { post: newPost })
  },
}
