<template>
  <div>
    <div class="card">
      <div class="card-content">
        <span class="card-title">New Post</span>
        <ui-textbox placeholder="Post Title" v-model="title"></ui-textbox>
        <wysiwyg name="post" v-model="post" placeholder="Post Content" />
        <br>
        <p>
          <ui-autocomplete label="Tags" name="tag" placeholder="Type your tag and click comma" :suggestions="categories"
            v-model="tag" @keyup.188.native="addCategory"></ui-autocomplete>
        </p>

        <ui-button v-for="t in catToAdd" color="red" icon="cancel" :icon-position="iconPosition" :size="size" style="margin-left: .5em"
          @click="destroyTag(t)" v-bind:data="t" v-bind:key="t">{{ t }}</ui-button>
      </div>

      <div class="card-action">
        <ui-button color="primary" raised :disabled="!isFormValid" @click="addPost">Add New Post</ui-button>
      </div>
    </div>
  </div>
</template>

<script>
  import EventBus from '@/eventBus'

  export default {
    name: 'PostForm',
    data() {
      return {
        user: Object,
        iconPosition: "right",
        size: "small",
        title: '',
        autocomplete1: null,
        post: '',
        tag: '',
        categories: [],
        catToAdd: []
      }
    },
    computed: {
      isFormValid() {
        let flag = false
        if (this.post && this.title) flag = true
        return flag
      },
    },
    created() {
      this.fetchCategories()
    },
    methods: {
      addCategory() {
        this.catToAdd.push(this.tag.replace(",", ""))
        this.tag = ""
      },
      fetchCategories() {
        axios
          .get('/categories/get')
          .then(response => {
            response.data.data.forEach(d => {
              this.categories.push(d.tag)
            });
          })
      },
      addPost() {
        const token = localStorage.getItem('postr-token')

        axios
          .post(
            '/add', {
              body: this.post,
              title: this.title,
              categories: this.catToAdd
            }, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          )
          .then(response => {

            // fire an event to the event bus
            EventBus.$emit('postAdded', response.data.data)

            // clear input field
            this.post = ''
            this.title = ''
            this.catToAdd = []
          })
      },
      destroyTag(tag) {
        let arr = this.catToAdd;
        arr.forEach(function (d, index) {
          if (d == tag) {
            arr.splice(index, 1);
          }
        })
        this.catToAdd = arr
      }
    }
  }

</script>
