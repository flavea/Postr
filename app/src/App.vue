<template>
  <div id="app">
    <Menu></Menu>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Menu from '@/components/Parts/Menu'
  import EventBus from '@/eventBus'

  export default {
    name: 'App',
    components: {
      Menu
    }
  }

</script>


<style>
  body {
    background-color: #f7f7f7;
  }

  .is-danger {
    color: #9f3a38;
  }
</style>
