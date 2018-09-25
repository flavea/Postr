<template>
  <div class="row">
    <UserSettingsMenu />

    <div class="col s8">
      <div class="card">
        <div class="card-content">
          <Notification :message="notification.message" :type="notification.type" v-if="notification.message" />

          <form class="ui form" @submit.prevent="changePassword">
            <div class="field" :class="{ error: errors.has('password') }">
              <ui-textbox type="password" name="password" v-model="password" data-vv-as="current password" v-validate="'required'"
                label="Current Password" floatingLabel="true"></ui-textbox>
              <span v-show="errors.has('password')" class="is-danger">{{ errors.first('password') }}</span>
            </div>

            <div class="field" :class="{ error: errors.has('newPassword') }">
              <ui-textbox type="password" name="newPassword" v-model="newPassword" data-vv-as="new password" v-validate="'required'"
                label="New Password" floatingLabel="true"></ui-textbox>
              <span v-show="errors.has('newPassword')" class="is-danger">{{ errors.first('newPassword') }}</span>
            </div>

            <div class="field" :class="{ error: errors.has('confirmPassword') }">
              <ui-textbox type="password" name="confirmPassword" v-model="confirmPassword" data-vv-as="confirm password"
                v-validate="'required|confirmed:newPassword'" label="Confirm Password" floatingLabel="true"></ui-textbox>
              <span v-show="errors.has('confirmPassword')" class="is-danger">{{ errors.first('confirmPassword') }}</span>
            </div>

            <ui-button color="primary" raised>Update Password</ui-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Notification from '@/components/Parts/Notification'
  import UserSettingsMenu from '@/components/User/Settings/UserSettingsMenu'
  import Menu from '@/components/Parts/Menu'

  export default {
    name: 'UserProfileEditForm',
    components: {
      Notification,
      UserSettingsMenu,
      Menu
    },
    data() {
      return {
        password: '',
        newPassword: '',
        confirmPassword: '',
        notification: {
          message: '',
          type: ''
        }
      }
    },
    computed: {
      isFormValid() {
        return Object.keys(this.fields).every(key => this.fields[key].valid)
      },
    },
    beforeRouteEnter(to, from, next) {
      const token = localStorage.getItem('postr-token')

      return token ? next() : next('/')
    },
    methods: {
      changePassword() {
        const token = localStorage.getItem('postr-token')

        axios
          .put(
            '/account/change_password', {
              password: this.password,
              newPassword: this.newPassword
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              },
            }
          )
          .then(response => {
            // clear form inputs
            this.password = this.newPassword = this.confirmPassword = ''

            // display success notification
            this.notification = Object.assign({}, this.notification, {
              message: response.data.message,
              type: 'success'
            })
          })
          .catch(error => {
            // clear form inputs
            this.password = this.newPassword = this.confirmPassword = ''

            // clear form error messages
            this.$nextTick(() => {
              this.$validator.reset()
            })

            // display error notification
            this.notification = Object.assign({}, this.notification, {
              message: error.response.data.message,
              type: 'danger'
            })
          })
      }
    }
  }

</script>
