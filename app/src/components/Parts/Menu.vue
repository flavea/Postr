<template>
  <ui-toolbar title="Blog CRUD Application with Vue.js and Adonis.js" :removeNavIcon=true>
    <div slot="actions">
      <router-link class="item" to="/"><ui-icon-button color="black" icon="home" size="large" type="secondary"></ui-icon-button></router-link>
      <router-link class="item" to="/authors"><ui-icon-button color="black" icon="people" size="large" type="secondary"></ui-icon-button></router-link>
      <router-link class="item" :to="`/${user.username}`"><ui-icon-button color="black" icon="account_circle" size="large" type="secondary" v-show="isLoggedIn"></ui-icon-button></router-link>
      <router-link class="item" to="/settings/profile"><ui-icon-button color="black" icon="settings" size="large" type="secondary" v-show="isLoggedIn"></ui-icon-button></router-link>
        <a class="item" @click="logout"><ui-icon-button color="black" icon="exit_to_app" size="large" type="secondary" v-show="isLoggedIn"></ui-icon-button></a>
      <router-link class="item" to="/signup" v-show="!isLoggedIn"><ui-icon-button color="black" icon="account_circle" size="large" type="secondary"></ui-icon-button></router-link>
    </div>
  </ui-toolbar>
</template>

<script>
  import EventBus from '@/eventBus'
  export default {
    name: 'Menu',
    data() {
      return {
        user: Object,
        authUser: Object,
        isLoggedIn: false
      }
    },
    created() {
      EventBus.$on('loggedIn', this.fetchAuthenticatedUser)
      EventBus.$on('loggedOut', this.fetchAuthenticatedUser)
      this.fetchAuthenticatedUser()
    },
    methods: {
      fetchAuthenticatedUser() {
        const token = localStorage.getItem('postr-token')
        if(token && token != "" && token != null) {
          axios
            .get('/account/me', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then(response => {
              this.user = response.data.data
              this.isLoggedIn = true
            })
            .catch(error => {
              console.log(error)
              this.isLoggedIn = false
            })
        } else this.isLoggedIn = false
          
      },
      logout() {
        localStorage.removeItem('postr-token')
        EventBus.$emit('loggedOut', null)
        this.$router.push('/')
        this.isLoggedIn = false
      }
    }
  }

</script>
