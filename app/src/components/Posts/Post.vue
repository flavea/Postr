<template>
  <div class="card">
    <div class="card-content">
      <router-link :to="`/post/${post.id}`" class="card-title"><b>{{post.title}}</b></router-link>
      <div class="row card green" style="padding: .5em">
        <div class="col s7" style="margin-top:.2em">
          <router-link :to="`/${post.user.username}`" class="white-text" v-if="post.user != undefined">
            {{ post.user.name }}
            <small>{{ `@${post.user.username}` }}</small>
          </router-link>
        </div>
        <div class="col s5 right-align">
          <div class=" collection-item">
            <router-link :to="`/post/${post.id}`" class="white-text">
              <small>{{ post.created_at | timeAgo }}</small>
            </router-link>
            <small v-if="canDeletePost">
              <ui-icon-button class="red white-text" color="white" icon="delete" size="small" type="secondary" @click="$refs['ConfirmBox'].open()"
                style="transform:scale(.8)"></ui-icon-button>
              <router-link :to="`edit/${post.id}`">
                <ui-icon-button class="blue white-text" color="white" icon="edit" size="small" type="secondary" style="transform:scale(.8)"></ui-icon-button>
              </router-link>
            </small>
          </div>
        </div>
      </div>
      <p v-html="post.body"></p>
    </div>
    <div class="card-action">
      <div style="width: 70%" class="left">
        <router-link v-for="a in post.categories" :to="`/category/${a.tag}`" v-bind:data="a" v-bind:key="a.id">
          #{{ a.tag }}
        </router-link>
      </div>
      <PostReactions :post="post" :replies="post.comments" :favorites.sync="post.favorites" :authUser="authUser" />

      <div class="clearfix"></div>
    </div>


    <ui-confirm ref="ConfirmBox" title="Delete Post" transition="fade" @confirm="deletePost(post.id)">
      Do you want to delete this Post?
    </ui-confirm>
  </div>
</template>

<script>
  import PostReactions from '@/components/Posts/PostReactions'

  export default {
    name: 'Post',
    components: {
      PostReactions
    },
    props: {
      post: {
        required: true
      },
      authUser: {
        required: true
      },
    },
    created() {
      
    },
    computed: {
      canDeletePost() {
        return this.post.user_id == this.authUser.id
      }
    },
    methods: {
      deletePost(postId) {
        const token = localStorage.getItem('postr-token')
          axios
            .delete(`/destroy/${postId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then(response => {
              this.$emit('delete', postId)
            })
        }
    }
  }

</script>
