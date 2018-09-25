<template>
  <div>
    <center>
      <ui-progress-circular color="multi-color" v-show="loading"></ui-progress-circular>
    </center>
    <div v-show="!loading" class="row">
      <div class="card col s12 red white-text">
        <div class="card-content card-title">Users</div>
      </div>
      
      <div class="card center col s12" v-if="!users || users <= 0">
        <div class="card-content">There is no registered users yet</div>
      </div>

      <UserCard v-for="user in users" :key="user.id" :user="user" />
    </div>
  </div>
</template>

<script>
  import UserCard from '@/components/User/Profile/UserCard'

  export default {
    name: 'Users',
    components: {
      UserCard
    },
    data() {
      return {
        loading: false,
        users: Array
      }
    },
    created () {
      this.fetchUsers()
    },
    methods: {
      fetchUsers() {
        this.loading = true
        axios.get('users/get').then(response => {
          this.users = response.data.data
          this.loading = false
        })
      }
    }
  }

</script>
