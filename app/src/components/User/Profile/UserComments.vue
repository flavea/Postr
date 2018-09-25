<template>
  <div class="card">
    <div class="card-content"><span class="card-title">Latest Comments</span></div>
    
    <div class="card center" v-if="!comments || comments.length <= 0">
      <div class="card-content">{{ user.username }} hasn't left any comment.</div>
    </div>

    <div class="card-action" v-for="c in comments" v-bind="c" v-bind:key="c.id">
      {{ c.comment }} 
      <small>in <router-link :to="`/post/${c.post.id}`">{{ c.post.title }}</router-link></small>
    </div>
  </div>
</template>

<script>
  import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'
  import UserCard from '@/components/User/Profile/UserCard'
  import profileMixin from '@/mixins/profileMixin'

  export default {
    name: 'UserComments',
    props: {
      user: {
        required: true,
      },
      comments: {
        required: true
      }
    }
  }

</script>
