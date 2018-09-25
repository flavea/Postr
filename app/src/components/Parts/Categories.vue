<template>
  <div class="card">
    <div class="card-content">
      <center><ui-progress-circular color="multi-color" v-show="load"></ui-progress-circular></center>
      <span class="card-title" style="margin-bottom: 1em">Categories</span>
      
      <div class="center" v-if="!categories || categories.length <= 0" v-show="!load">
        There is no category yet
      </div>
      <router-link v-for="a in categories" :to="`/category/${a.tag}`" v-bind:data="a" v-bind:key="a.id">
        <div class="card red white-text" style="padding: .5em">
          #{{ a.tag }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import EventBus from '@/eventBus'
  export default {
    name: 'Categories',
    data() {
      return {
        load: false,
        categories: []
      }
    },
    created() {
      EventBus.$on('postAdded', this.fetchCategories)
      EventBus.$on('loggedIn', this.fetchCategories)
      this.fetchCategories()
    },
    methods: {
      fetchCategories() {
        this.load = true
        axios
          .get('/categories/get')
          .then(response => {
            this.categories = response.data.data.reverse()
            this.load = false
          })
      }
    }
  }

</script>
