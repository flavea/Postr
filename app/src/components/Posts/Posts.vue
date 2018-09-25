<template>
  <div>
    <div class="card center" v-if="!posts || posts.length <= 0">
      <div class="card-content">There is no post yet</div>
    </div>
    <Post v-for="post in posts" :key="post.id" :post="post" :authUser="authUser" v-on:delete="removeDeletedPost" />
  </div>
</template>

<script>
  import Post from '@/components/Posts/Post'
  import EventBus from '@/eventBus'

  export default {
    name: 'Posts',
    components: {
      Post
    },
    props: {
      posts: {
        required: true
      },
      authUser: {
        required: true
      }
    },
    created() {
      EventBus.$on('postAdded', this.fetchAddedPost)
    },
    methods: {
      fetchAddedPost(post) {
        return this.posts.unshift(post)
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
