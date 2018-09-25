<template>
  <div class="row">
    <center>
      <ui-progress-circular color="multi-color" v-show="loading"></ui-progress-circular>
    </center>
    <div class="col s8" v-show="!loading">
      <PostForm :user="user" v-show="isLoggedIn" />
      <Posts :posts.sync="posts" :authUser="authUser" />
    </div>
    <div class="col s4" v-show="!loading">
      <div class="card" v-show="!isLoggedIn">
        <div class="card-content">
          <span class="card-title">Log In</span>

          <Notification :message="notification.message" :type="notification.type" v-if="notification.message" />

          <form @submit.prevent="login">
            <ui-textbox type="email" name="email" v-model="email" placeholder="Email" required></ui-textbox>
            <ui-textbox type="password" name="password" v-model="password" placeholder="Password" required></ui-textbox>

            <ui-button color="primary" raised>Login</ui-button>

          </form>

        </div>
        <div class="card-action">
          Don't have an account? <router-link to="/register">Sign Up</router-link>
        </div>
      </div>

      <Categories />
    </div>
  </div>
</template>

<script>
  import PostForm from '@/components/Posts/PostForm'
  import Posts from '@/components/Posts/Posts'
  import Categories from '@/components/Parts/Categories'
  import Menu from '@/components/Parts/Menu'
  import Notification from '@/components/Parts/Notification'
  import EventBus from '@/eventBus'

  export default {
    name: 'Home',
    components: {
      PostForm,
      Posts,
      Categories,
      Menu,
      Notification
    },
    data() {
      return {
        isLoggedIn: false,
        authUser: Object,
        user: Object,
        loading: false,
        posts: [],
        email: '',
        password: '',
        notification: {
          message: '',
          type: ''
        }
      }
    },
    created() {
      EventBus.$on('loggedIn', this.fetchAuthenticatedUser)
      EventBus.$on('loggedOut', this.fetchAuthenticatedUser)
      this.fetchAuthenticatedUser()
      this.fetchUserTimeline()
    },
    methods: {
      fetchAuthenticatedUser() {
        const token = localStorage.getItem('postr-token')
        if (token && token != null && token != "") {
          this.loading = true
          axios
            .get('/account/me', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then(response => {
              this.authUser = response.data.data
              this.isLoggedIn = true
              this.loading = false
            })
            .catch(error => {
              console.log(error)
              this.isLoggedIn = false
            })
        } else this.isLoggedIn = false
      },
      fetchUserTimeline() {

        this.loading = true
        axios
          .get('/timeline')
          .then(response => {
            this.posts = response.data.data.reverse()
            this.loading = false
          })
      },
      login() {
        axios
          .post('/login', {
            email: this.email,
            password: this.password,
          })
          .then(response => {
            localStorage.setItem('postr-token', response.data.data.token)
            EventBus.$emit('loggedIn', response.data.data)
          })
          .catch(error => {
            this.email = this.password = ''

            this.notification = Object.assign({}, this.notification, {
              message: error.response.data.message,
              type: error.response.data.status
            })
          })
      }
    }
  }

</script>
