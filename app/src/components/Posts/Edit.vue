<template>
  <div>
    <EditForm :user="user" :editPost="post" :categories="categories" />
    <Comments :comments="comments"/>
  </div>
</template>

<script>
  import Comments from '@/components/Posts/Comments'
  import EditForm from '@/components/Posts/EditForm'

  export default {
    name: 'EditPost',
    components: {
      Comments,
      EditForm
    },
    data() {
      return {
        post: Object,
        authUser: Object,
        comments: [],
        reply: '',
        user: '',
        categories: []
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
        axios.get(`/posts/${this.$route.params.id}`).then(response => {
          this.post = response.data.data
          this.comments = response.data.data.comments.reverse()
          this.categories = response.data.data.categories
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
      
    }
  }

</script>
