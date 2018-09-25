<template>
  <div class="row">
    <UserSettingsMenu />

    <div class="col s8">
      <div class="card">
        <div class="card-content">

          <Notification :message="notification.message" :type="notification.type" v-if="notification.message" />

          <form class="ui form" @submit.prevent="UploadImage">

            <div class="center">
              <img width="200" class="circle" v-if="preview.length > 0" :src="preview"><br>
              <ui-fileupload accept="image/*" name="image" @change="ImageChange" ref="file">Select an image</ui-fileupload>
              <div class="clearfix"></div>
            </div>
            <br>
            <div class="field" :class="{ error: errors.has('name') }">
              <ui-textbox type="text" name="name" v-model="name" v-validate="'required'" label="Full Name"
                :floatingLabel="true"></ui-textbox>
              <span v-show="errors.has('name')" class="is-danger">{{ errors.first('name') }}</span>
            </div>

            <div class="field" :class="{ error: errors.has('name') }">
              <ui-textbox type="text" name="username" v-model="username" v-validate="'required'" label="Username"
                :floatingLabel="true"></ui-textbox>
              <span v-show="errors.has('username')" class="is-danger">{{ errors.first('username') }}</span>
            </div>

            <div class="field" :class="{ error: errors.has('email') }">
              <ui-textbox type="email" name="email" v-model="email" v-validate="'required|email'" placeholder="Email"
                label="Email" :floatingLabel="true"></ui-textbox>
              <span v-show="errors.has('email')" class="is-danger">{{ errors.first('email') }}</span>
            </div>

            <div class="field">
              <ui-textbox v-model="bio" :rows="5" label="About Me" :floatingLabel="true" :multiLine="true"></ui-textbox>
            </div>

            <div class="field">
              <ui-textbox type="text" v-model="location" placeholder="Your location" label="Location" :floatingLabel="true"></ui-textbox>
            </div>

            <div class="field">
              <ui-textbox type="url" v-model="websiteUrl" placeholder="Website URL" label="Website URL" :floatingLabel="true"></ui-textbox>
            </div>

            <ui-button color="primary" raised>Update Profile</ui-button>
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
    name: 'UserProfileSettings',
    components: {
      Notification,
      UserSettingsMenu,
      Menu
    },
    data() {
      return {
        file: '',
        pp: '',
        preview: 'https://pbs.twimg.com/profile_images/1028261732618125312/seEaxJAV_400x400.jpg',
        name: '',
        username: '',
        email: '',
        bio: '',
        location: '',
        websiteUrl: '',
        notification: {
          message: '',
          type: ''
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      const token = localStorage.getItem('postr-token')
      return token ? next() : next('/')
    },
    created() {
      this.fetchAuthenticatedUser()
    },
    methods: {
      fetchAuthenticatedUser() {
        const token = localStorage.getItem('postr-token')

        axios
          .get('account/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            this.name = response.data.data.name
            this.username = response.data.data.username
            this.email = response.data.data.email
            this.location = response.data.data.location
            this.bio = response.data.data.bio
            this.websiteUrl = response.data.data.website_url
            this.pp = response.data.data.profile_pic
            if(this.pp != "" && this.pp != null) this.preview = this.pp
          })
      },
      ImageChange(files) {
        this.preview = URL.createObjectURL(files[0]);
        this.file = files[0]
      },
      UploadImage() {
        if(this.file != "" && this.file.fileName != this.pp) {
          let file = ""
          let formData = new FormData();
          formData.append('profile_pic', this.file);
          
          axios.post( '/upload',
            formData,
            {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
            }
          )
            .then(response => {
              file = `${axios.defaults.baseURL}/img/${response.data.fileName}`
              this.pp = file
              this.updateProfile(file)
            })
        } else {
          this.updateProfile(this.pp)
        }
      },
      updateProfile(filename) {
        const token = localStorage.getItem('postr-token')

        axios
          .put(
            '/account/update_profile', {
              name: this.name,
              username: this.username,
              email: this.email,
              location: this.location,
              bio: this.bio,
              website_url: this.websiteUrl,
              profile_pic: filename
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(response => {
            // display success notification
            this.notification = Object.assign({}, this.notification, {
              message: response.data.message,
              type: 'success'
            })
          })
      }
    }
  }

</script>
