<template>
  <div>
    <center>
      <ui-progress-circular color="multi-color" v-show="loading"></ui-progress-circular>
    </center>
    <Post :key="post.id" :post="post" :authUser="authUser" v-on:delete="removeDeletedPost"  v-show="!loading"/>
    <div class="card" v-show="!loading">
      <div class="card-content">
        <form class="ui form" @submit.prevent="replyPost">
          <ui-textbox name="reply" v-model="reply" :rows=3 placeholder="Reply post" multiLine></ui-textbox>

          <ui-button color="primary" raised :disabled="!isFormValid">Comment</ui-button>
        </form>

      </div>
    </div>
    
    <Comments :comments="comments" :authUser="authUser" :postOwner="post.user_id" v-show="!loading"/>
  </div>
</template>

<script>
  import Comments from '@/components/Posts/Comments'
  import Post from '@/components/Posts/Post'
  import PostReactions from '@/components/Posts/PostReactions'

  export default {
    name: 'SinglePost',
    components: {
      Comments,
      PostReactions,
      Post
    },
    data() {
      return {
        loading: false,
        post: Object,
        authUser: Object,
        comments: [],
        reply: ''
      }
    },
    computed: {
      isFormValid() {
        return !!this.reply
      }
    },
    created() {
      this.fetchPost()
      this.fetchAuthenticatedUser()
    },
    methods: {
      fetchPost() {
        this.loading = true
        axios.get(`/posts/${this.$route.params.id}`).then(response => {
          this.post = response.data.data
          this.comments = response.data.data.comments.reverse()
          this.loading = false
        })
      },
      back() {
        this.$router.go(-1)
      },
      replyPost() {
        const token = localStorage.getItem('postr-token')

        axios
          .post(
            `/posts/reply/${this.post.id}`, {
              comment: this.reply
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(response => {
            this.reply = ''
            this.comments.unshift(response.data.data)
          })
      },
      fetchAuthenticatedUser() {
        const token = localStorage.getItem('postr-token')

        axios
          .get('account/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            this.authUser = response.data.data
          })
      },
      removeDeletedPost(postId) {
        const filteredPosts = this.posts.filter(post => {
          return post.id !== postId
        })

        this.$emit('update:posts', filteredPosts)
      }
    }
  }

</script>
