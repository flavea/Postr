<template>
  <router-link :to="`/${user.username}`" class="col s3">
    <div class="card">
      <div class="card-content center">
        <div class="card-title">

          <img :src="user.profile_pic" v-show="user.profile_pic" class="circle" width="100%">
          <img src="https://pbs.twimg.com/profile_images/1028261732618125312/seEaxJAV_400x400.jpg" v-show="!user.profile_pic"
            class="circle" width="100%"><b>{{ user.name }}</b><br><small>(@{{ user.username }})</small>
        </div>
        {{ user.bio }}
      </div>
    </div>
  </router-link>
</template>

<script>
  export default {
    name: 'UserCard',
    props: {
      user: {
        required: true
      }
    }
  }

</script>
