<template>
    <div>
      <div class="card green white-text">
        <div class="card-content row" style="margin-bottom: 0">
          <div class="col s2">
            <img :src="user.profile_pic" v-show="user.profile_pic" class="circle" width="100%">
            <img src="https://pbs.twimg.com/profile_images/1028261732618125312/seEaxJAV_400x400.jpg" v-show="!user.profile_pic" class="circle" width="100%">
          </div>
          <div class="col s7">
            <router-link :to="`/${user.username}`" class="white-text card-title">
              <h5>{{ user.name }} ({{ `@${user.username}` }})</h5>
            </router-link>
            <p v-show="user.bio">{{ user.bio }}</p>
            <br>
            <router-link to="/settings/profile" class="waves-effect waves-light btn blue" v-if="isOwner">Edit profile</router-link>

            <span v-if="isLoggedIn && !isOwner">
              <button class="waves-effect waves-light btn red" v-if="isFollowing" @click="unFollow(user.id)">Unfollow</button>
              <button class="waves-effect waves-light btn blue" v-else @click="follow(user.id)">Follow</button>
            </span>
          </div>
          <div class="col s3"><br>
              <div v-show="user.location" style="margin-bottom: .5em">
                <ui-icon icon="location_on"></ui-icon>
                {{ user.location }}
              </div>
              <div v-show="user.website_url" style="margin-bottom: .5em">
                <ui-icon icon="signal_wifi_4_bar"></ui-icon>
                <a :href="user.website_url" target="_blank" class="white-text">{{ user.website_url }}</a>
              </div>
              <div v-show="user.created_at" style="margin-bottom: .5em">
                <ui-icon icon="event"></ui-icon>
                Joined {{ user.created_at | joined }}
              </div>
              <div v-show="user.dob" style="margin-bottom: .5em">
                <ui-icon icon="cake"></ui-icon>
                {{ user.dob | dob }}
              </div>

          </div>

          
        </div>
        
            <div class="row">
              
            <router-link :to="`/${user.username}`" class="white-text col s3 red center">
              <div class="card-title"><small>Posts</small></div>
              <strong style="margin-bottom:.5em;display:block" v-if='user.posts'>{{ user.posts.length }}</strong>
            </router-link>
            <router-link :to="isOwner ? `/favorites` : `/${user.username}/favorites`" class="white-text col s3 blue center">
              <div class="card-title"><small>Favorites</small></div>
              <strong style="margin-bottom:.5em;display:block" v-if='user.favorites'>{{ user.favorites.length }}</strong>
            </router-link>
            <router-link :to="isOwner ? `/followers` : `/${user.username}/followers`" class="white-text col s3 red center">
              <div class="card-title"><small>Followers</small></div>
              <strong style="margin-bottom:.5em;display:block" v-if='user.followers'>{{ user.followers.length }}</strong>
            </router-link>
            <router-link :to="isOwner ? `/following` : `/${user.username}/following`" class="white-text col s3 blue center">
              <div class="card-title"><small>Following</small></div>
              <strong style="margin-bottom:.5em;display:block" v-if='user.following'>{{ user.following.length }}</strong>
            </router-link>
          </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'UserProfileHeader',
    props: {
      user: {
        required: true
      },
      authUser: {
        required: true
      }
    },
    computed: {
      isOwner() {
        return this.user.id === this.authUser.id
      },
      isLoggedIn() {
        const token = localStorage.getItem('postr-token')
        if (token && token != "" && token != null) return true
        else return false
      },
      isFollowing() {
        if(this.isLoggedIn && this.authUser.following != undefined) {
          for (const following of this.authUser.following) {
            if (following.id === this.user.id) {
              return true
            }
          }
        }

        return false
      }
    },
    methods: {
      follow(userId) {
        const token = localStorage.getItem('postr-token')

        axios
          .post(
            '/users/follow', {
              user_id: userId
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(response => {
            this.authUser.following.push({
              id: userId
            })
          })
      },
      unFollow(userId) {
        const token = localStorage.getItem('postr-token')

        axios
          .delete(`/users/unfollow/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            this.authUser.following = this.authUser.following.filter(u => {
              return u.id !== userId
            })
          })
      }
    }
  }

</script>
