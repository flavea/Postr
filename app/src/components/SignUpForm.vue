<template>
  <div class="card">
    <div class="card-content">
      <h5 class="card-header center">Register</h5>

      <Notification :message="notification.message" :type="notification.type" v-if="notification.message" />

      <form class="ui form" @submit.prevent="signup">
        <div class="field" :class="{ error: errors.has('name') }">
          <ui-textbox type="text" name="name" v-model="name" v-validate="'required'" placeholder="Full name" label="Full name"
            floatingLabel="true"></ui-textbox>
          <span v-show="errors.has('name')" class="is-danger">{{ errors.first('name') }}</span>
        </div>

        <div class="field" :class="{ error: errors.has('username') }">
          <ui-textbox type="text" name="username" :class="{'input': true, 'is-danger': errors.has('username') }"
            v-model="username" v-validate="'required'" placeholder="Username" label="Username" floatingLabel="true"></ui-textbox>
          <span v-show="errors.has('username')" class="is-danger">{{ errors.first('username') }}</span>
        </div>

        <div class="field" :class="{ error: errors.has('email') }">
          <ui-textbox type="email" name="email" :class="{'input': true, 'is-danger': errors.has('email') }" v-model="email"
            v-validate="'required|email'" placeholder="Email" label="Email" floatingLabel="true"></ui-textbox>
          <span v-show="errors.has('email')" class="is-danger">{{ errors.first('email') }}</span>
        </div>

        <div class="field" :class="{ error: errors.has('password') }">
          <ui-textbox type="password" name="password" :class="{'input': true, 'is-danger': errors.has('password') }"
            v-model="password" v-validate="'required'" placeholder="Password" label="Password" floatingLabel="true"></ui-textbox>
          <span v-show="errors.has('password')" class="is-danger">{{ errors.first('password') }}</span>
        </div>
        <ui-button color="primary" raised :disabled="!isFormValid">Register</ui-button>

      </form>
    </div>

    <div class="card-action">
      Got an account?
      <router-link to="/">Log In</router-link>
    </div>
  </div>
</template>

<script>
  import Notification from '@/components/Parts/Notification'

  export default {
    name: 'SignUpForm',
    components: {
      Notification
    },
    data() {
      return {
        name: '',
        username: '',
        email: '',
        password: '',
        notification: {
          message: '',
          type: ''
        }
      }
    },
    computed: {
      isFormValid() {
        return Object.keys(this.fields).every(key => this.fields[key].valid)
      }
    },
    beforeRouteEnter(to, from, next) {
      const token = localStorage.getItem('postr-token')

      return token ? next('/') : next()
    },
    methods: {
      signup() {
        axios
          .post('/signup', {
            name: this.name,
            username: this.username,
            email: this.email,
            password: this.password
          })
          .then(response => {
            // save token in localstorage
            localStorage.setItem('postr-token', response.data.data.token)

            // redirect to user home
            this.$router.push('/')
          })
          .catch(error => {
            // display error notification
            this.notification = Object.assign({}, this.notification, {
              message: error.response.data.message,
              type: error.response.data.status
            })
          })
      }
    }
  }

</script>
