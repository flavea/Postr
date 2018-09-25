<template>
  <div>
    <center>
      <ui-progress-circular color="multi-color" v-show="loading"></ui-progress-circular>
    </center>
    <UserProfileHeader :user="user" :authUser="authUser" v-show="!loading" />
    <div class="row" v-show="!loading">
      <div class="col s8">
        <Posts :posts.sync="posts" :authUser="authUser" />
      </div>
      <div class="col s4">
        <Categories />
        <UserComments :comments="user.comments" :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
  import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'
  import UserComments from '@/components/User/Profile/UserComments'
  import Categories from '@/components/Parts/Categories'
  import Posts from '@/components/Posts/Posts'
  import profileMixin from '@/mixins/profileMixin'

  export default {
    name: 'UserProfile',
    mixins: [profileMixin],
    components: {
      UserProfileHeader,
      Categories,
      Posts,
      UserComments
    },
    data() {
      return {
        posts: []
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.fetchUser(to.params.username)

      next()
    }
  }

</script>
