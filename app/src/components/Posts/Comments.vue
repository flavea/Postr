<template>
  <div>
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-content">
          <router-link :to="`/${comment.user.username}`" class="card-title">
            {{ comment.user.name }}
            <small>{{ `@${comment.user.username}` }}</small>
            <div class="date right">
              {{ comment.created_at | timeAgo }}
            </div>
          </router-link>
        {{ comment.comment }}
        </div>
        <div class="card-action" v-if="(comment.user.id == authUser.id) || (authUser.id == postOwner)">
          <ui-icon-button class="red white-text" color="white" icon="delete" size="small" type="secondary" @click="deleteComment(comment.id)" style="transform:scale(.8)"></ui-icon-button>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'Comments',
    props: {
      comments: {
        required: true
      },
      authUser: {
        required: true
      },
      postOwner: {
        required: true
      }
    },
    methods: {
      deleteComment(id) {
        const token = localStorage.getItem('postr-token')
        const deleteConfirmed = confirm('Are you sure?')

        if (deleteConfirmed) {
          axios
            .delete(`comments/destroy/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then(response => {
              const filteredComments = this.comments.filter(comment => {
                return comment.id !== id
              })

              this.comments = filteredComments

              this.$emit('update:comments', filteredComments)
            })
        }
      }
    }
  }
</script>
