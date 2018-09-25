<template>
  <div class="row">

    <center>
      <ui-progress-circular color="multi-color" v-show="loading"></ui-progress-circular>
    </center>
    <div class="card col s12 red white-text" v-show="!loading">
      <div class="card-content card-title">#{{ this.$route.params.tag }}</div>
    </div>
    <div class="col s8" v-show="!loading">
      <div class="card" v-for="post in posts" v-bind="post" v-bind:key="post.id">
        <div class="card-content">
          <span class="card-title">
            <router-link :to="`/post/${post.id}`">{{post.title}}
            </router-link>
          </span>
          <p v-html="$options.filters.truncate(post.body, 500)"></p>
        </div>
      </div>
    </div>
    <div class="col s4" v-show="!loading">
      <Categories />
    </div>
  </div>
</template>

<script>
  import Categories from '@/components/Parts/Categories'
  import Posts from '@/components/Posts/Posts'

  export default {
    name: 'Category',
    components: {
      Categories,
      Posts
    },
    data() {
      return {
        loading: false,
        user: Object,
        authUser: Object,
        posts: []
      }
    },
    computed: {
      isLoggedIn() {
        return !!this.authUser
      }
    },
    created() {
      this.fetchTag(this.$route.params.tag)
      const token = localStorage.getItem('postr-token')
      if (token && token != "" && token != null && token != undefined) this.fetchAuthenticatedUser(token)
    },
    methods: {
      fetchTag(tag) {
        this.loading = true
        axios.get(`categories/show/${tag}`).then(response => {
          this.posts = response.data.data
          this.loading = false
        })
      },
      fetchAuthenticatedUser(token) {
        this.loading = true
        axios
          .get('account/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            this.authUser = response.data.data
            this.loading = false
          })
      }
    }
  }
</script>
