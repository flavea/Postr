<template>
  <div class="right" style="width: 20%">
    <a class="reply" v-if="replies != undefined">
      <ui-icon color="black" icon="comment" size="small" type="secondary"></ui-icon>
      {{ replies.length }}
    </a>
    <a class="like" v-if="isFavoritedByUser && favorites != undefined" @click="unFavoritepost">
      <ui-icon-button class="blue" color="red" icon="star" size="small" type="secondary"></ui-icon-button> {{ favorites.length }}
    </a>
    <a class="like" v-else-if="favorites != undefined">
      <ui-icon-button class="blue" color="white" icon="star" size="small" type="secondary" @click="favoritepost"></ui-icon-button> {{ favorites.length }}
    </a>
  </div>
</template>

<script>
  export default {
    name: 'PostReactions',
    props: {
      post: {
        required: true
      },
      authUser: {
        required: true
      },
      replies: {
        required: true
      },
      favorites: {
        required: true
      }
    },
    computed: {
      isFavoritedByUser() {
        if(this.favorites != undefined) {
          for (const favorite of this.favorites) {
            if (favorite.user_id === this.authUser.id) {
              return true
            }
          }
        }

        return false
      }
    },
    methods: {
      favoritepost () {
        const token = localStorage.getItem('postr-token')

        if (!token) {
          alert('You must be logged in to perform the action.')
          return
        }

        axios
          .post(
            '/favorites/create',
            { post_id: this.post.id },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(response => {
            this.favorites.push(response.data.data)
          })
      },
      unFavoritepost() {
        const token = localStorage.getItem('postr-token')

        if (!token) {
          alert('You must be logged in to perform the action.')
          return
        }

        axios
          .delete(`/favorites/destroy/${this.post.id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            const filteredFavorites = this.favorites.filter(favorite => {
              return favorite.user_id !== this.authUser.id
            })

            this.$emit('update:favorites', filteredFavorites)
          })
      }
    }
  }
</script>
