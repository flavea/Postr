<template>
  <div>
    <center>
      <ui-progress-circular color="multi-color" v-show="loading"></ui-progress-circular>
    </center>
    <UserProfileHeader :user="user" :authUser="authUser" v-show="!loading" />

    <div v-show="!loading" class="row">
      <div class="card col s12 blue white-text">
        <div class="card-content card-title">Followers</div>
      </div>
      
      <div class="card center col s12" v-if="!user.followers || user.followers.length <= 0">
        <div class="card-content">{{ user.username }} doesn't have any follower yet.</div>
      </div>

      <UserCard v-for="follower in user.followers" :key="follower.id" :user="follower" />
    </div>
  </div>
</template>

<script>
  import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'
  import UserCard from '@/components/User/Profile/UserCard'
  import profileMixin from '@/mixins/profileMixin'

  export default {
    name: 'UserFollowers',
    mixins: [profileMixin],
    components: {
      UserProfileHeader,
      UserCard
    }
  }

</script>
