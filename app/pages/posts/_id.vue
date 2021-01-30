<template>
  <section class="container posts-page">
    <div style="flex: 1">
      <el-card v-if="post">
        <div slot="header" class="clearfix">
          <h2>
            {{ post.title }}
          </h2>
          <small>by {{ post.user.id }}</small>
        </div>
        <p>
          {{ post.body }}
        </p>
        <p class="text-right">
          <el-button
            v-if="isLiked"
            :disabled="!isLoggedIn"
            type="warning"
            round
            @click="unlike"
          >
            <span class="el-icon-star-on" />
            <span>{{ post.likes.length }}</span>
          </el-button>
          <el-button
            v-else
            :disabled="!isLoggedIn"
            type="warning"
            round
            @click="like"
          >
            <span class="el-icon-star-off" />
            <span>{{ post.likes.length }}</span>
          </el-button>
        </p>
        <p class="text-right">
          {{ post.createdAt | time }}
        </p>
      </el-card>
      <p>
        <nuxt-link to="/posts"> &lt; 投稿一覧へ戻る </nuxt-link>
      </p>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import cloneDeep from 'lodash.clonedeep'
import moment from '~/plugins/moment'
export default {
  filters: {
    time(val) {
      return moment(val).format('YYYY/MM/DD HH:mm:ss')
    },
  },
  async asyncData({ store, route }) {
    if (store.getters['posts/posts'].find((p) => p.id === route.params.id)) {
      return
    }
    await store.dispatch('posts/fetchPosts')
  },
  computed: {
    post() {
      return this.posts.find((p) => p.id === this.$route.params.id)
    },
    isLiked() {
      if (!this.user) return false
      return this.post.likes.find((l) => l.userID === this.user.id)
    },
    ...mapGetters(['user', 'isLoggedIn']),
    ...mapGetters('posts', ['posts']),
  },
  methods: {
    like() {
      if (!this.isLoggedIn) {
        return
      }
      const likePayload = { user: this.user, post: this.post }
      this.addLikeToPost(cloneDeep(likePayload))
    },
    unlike() {
      if (!this.isLoggedIn) {
        return
      }
      const likePayload = { user: this.user, post: this.post }
      this.removeLikeToPost(cloneDeep(likePayload))
    },
    ...mapActions('posts', ['addLikeToPost', 'removeLikeToPost']),
  },
}
</script>
