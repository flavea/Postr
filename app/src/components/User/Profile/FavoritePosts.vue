<template>
  <div>
    <center>
      <ui-progress-circular color="multi-color" v-show="loading"></ui-progress-circular>
    </center>
    <UserProfileHeader :user="user" :authUser="authUser" v-show="!loading" />
    <div class="row" v-show="!loading">
      
      <div class="card col s12 blue white-text">
        <div class="card-content card-title">Favorite Posts</div>
      </div>
      <div class="col s8">
        <Posts :posts.sync="onlyPosts" :authUser="authUser" />
      </div>
      <div class="col s4">
        <Categories />
      </div>
    </div>
  </div>
</template>

<script>
  import UserProfileHeader from '@/components/User/Profile/UserProfileHeader'
  import Posts from '@/components/Posts/Posts'
  import Categories from '@/components/Parts/Categories'
  import profileMixin from '@/mixins/profileMixin'

  export default {
    name: 'FavoritePosts',
    mixins: [profileMixin],
    components: {
      UserProfileHeader,
      Posts,
      Categories
    },
    computed: {
      onlyPosts() {
        if (this.user.favorites != undefined)
          return Array.from(this.user.favorites, favorite => favorite.post).reverse()
      }
    }
  }

</script>
